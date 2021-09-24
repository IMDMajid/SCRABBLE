import { Component, OnDestroy, OnInit } from '@angular/core';
import { EASEL_SIZE } from '@app/classes/constants';
import { Letter } from '@app/classes/letter';
import { LetterService } from '@app/services/letter.service';
import { StartingPlayer } from '@app/classes/game-settings';
import { PlayerService } from '@app/services/player.service';
import { Player } from '@app/models/player.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-letter-easel',
    templateUrl: './letter-easel.component.html',
    styleUrls: ['./letter-easel.component.scss'],
})
export class LetterEaselComponent implements OnInit, OnDestroy {
    letterEaselTab: Letter[] = [];
    players: Player[]= new Array<Player>();
    playerSubscription: Subscription = new Subscription();

    fontSize: number;
    constructor(private letterService: LetterService, private playerService: PlayerService) {}

    ngOnInit(): void {
        this.initializeTab();
        this.fontSize= this.letterService.getFontSize();
    }

    initializeTab(): void {
        this.playerSubscription = this.playerService.playerSubject.subscribe((playersFromSubject: Player[]) => {
            this.players = playersFromSubject;
        });
        this.playerService.emitPlayers();

        for (let i = 0; i < EASEL_SIZE; i++) {
            this.letterEaselTab[i] = {
                value: this.players[StartingPlayer.Player1].letterTable[i].value,
                quantity: this.players[StartingPlayer.Player1].letterTable[i].quantity,
                points: this.players[StartingPlayer.Player1].letterTable[i].points,
            };
        }
    }

    ngOnDestroy() {
        this.playerSubscription.unsubscribe();
    }

    setFontSize(fontSize:number){
        this.letterService.setFontSize(fontSize);
    }
}
