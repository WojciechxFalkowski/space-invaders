//Szerokość ekranu canvas
import {createCanvas} from "./canvas";

export const WIDTH = window.innerWidth;

//Wysokosc ekranu canvas
export const HEIGHT = window.innerHeight;

//Wybieram szerokosc lub wysokosc zaleznie co jest mniejsze
export const SMALLER_SCREEN_VALUE = WIDTH < HEIGHT ? HEIGHT : WIDTH

//Liczba wierszy
export const rows = 8;

//Liczba kolumn
export const cols = 16;

//Tablica statkow obych
export const aliens: any = []

// Szerokosc jednej komorki
export const width: number = SMALLER_SCREEN_VALUE / cols

//Wysokosc jednej komorki
export const height: number = SMALLER_SCREEN_VALUE / cols

//Tworzenie canvas
export const canvas = createCanvas(WIDTH, HEIGHT);
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
if(!ctx)
{
    throw new Error("Browser not supported")
}
// liczba obcych w wierszu
export const aliensInRow = cols - 4

// Wysrodkowanie grida w pionie i poziomie
export const midWidth = WIDTH / 2 - (cols / 2) * width
export const midHeight = HEIGHT / 2 - (rows / 2) * height

//liczba kolumn z obcymi
export const columnsOfAliens = rows - 3