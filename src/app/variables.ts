//Szerokość ekranu canvas
import {createCanvas} from "./canvas";

//Wybieram szerokosc lub wysokosc zaleznie co jest mniejsze
export const SMALLER_SCREEN_VALUE = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth

export const WIDTH = window.innerWidth;

//Wysokosc ekranu canvas
export const HEIGHT = window.innerHeight;

//Liczba wierszy
export const rows = 8;

//Liczba kolumn
export const cols = 16;

// Szerokosc jednej komorki
export const width: number = WIDTH / cols

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

//liczba kolumn z obcymi
export const columnsOfAliens = 2
