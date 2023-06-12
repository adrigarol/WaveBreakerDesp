
export interface Game{
  _id?: number;
  coins: number;
  userId?: number;
  upgrades: number[];
  enemiesDefeated: number;
  gamesPlayed: number;
  victories: number;
  totalCoins: number;
}
