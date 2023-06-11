import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upgrade } from '../interfaces/upgrade';
import { Game } from '../interfaces/game';
import { GameService } from '../services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'wb-upgrade-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrade-page.component.html',
  styleUrls: ['./upgrade-page.component.css']
})
export class UpgradePageComponent implements OnInit{


  game!:Game;

  upgrades:Upgrade[]=[{name: "Ataque", description: "Aumenta un 5% el ataque con cada mejora", currentLevel: 1, maxLevel: 5, cost: 200, currentCost: 200, image: "asdas"},
  {name: "Defensa", description: "Aumenta un 5% la defensa con cada mejora", currentLevel: 1, maxLevel: 5, cost: 200, currentCost: 200, image: "asdas"},
  {name: "Regeneración", description: "Aumenta un 0.2 la regeneración de salud", currentLevel: 1, maxLevel: 5, cost: 150, currentCost: 150, image: "asdas"},
  {name: "PV Máx", description: "Aumenta un 10% la vitalidad máxima", currentLevel: 1, maxLevel: 5, cost: 100, currentCost: 100, image: "asdas"},
  {name: "Velocidad", description: "Aumenta un 10% la velocidad de movimiento", currentLevel: 1, maxLevel: 5, cost: 150,  currentCost: 200, image: "asdas"},
  {name: "Experiencia", description: "Aumenta un 5% la experiencia obtenida", currentLevel: 1, maxLevel: 5, cost: 250,  currentCost: 250, image: "asdas"}];


  constructor(
    private readonly gameService: GameService,
    ){

    }
  ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe({
      next: (res)=>{
        this.game=res;
        for(let i=0; i<res.upgrades.length; i++){
          this.upgrades[i].currentLevel=res.upgrades[i];
          this.initialCost(this.upgrades[i]);
        }
      }
    });
  }

  initialCost(upgrade: Upgrade){
    for(let i=2; i<=upgrade.currentLevel;i++){
      upgrade.currentCost=upgrade.currentCost + upgrade.cost*i;
    }


  }

  question(upName: string, newCoins: number): Promise<boolean> {
    return Swal.fire({background: '#130e53',
      color: '#fff',
      title:"¿Mejorar " + upName + "?",
      text:"Nuevo saldo: " + newCoins,
      icon:"question",
      iconColor: '#f0ed31',
      showDenyButton:true}).then((result)=> {
        if(result.value){
          return true;
        }
        else{
          return false;
        }
      })

  }

  upgrade(g: Game, index: number){
    if(g.coins >= this.upgrades[index].cost){
      this.question(this.upgrades[index].name, g.coins-this.upgrades[index].cost).then(result=>{
        if(result){
          g.upgrades[index]+=1;
          this.upgrades[index].currentLevel=g.upgrades[index];
          g.coins=g.coins-this.upgrades[index].cost;
          this.upgrades[index].currentCost=this.upgrades[index].currentCost+this.upgrades[index].cost*this.upgrades[index].currentLevel;
          this.gameService.updateGame(g,g._id).subscribe();
        }
      }
      )

    }
  }
}
