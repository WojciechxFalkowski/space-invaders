# Space Invaders

## Reguły Gry

Gra polega na zestrzeleniu obcych poruszających się w kosmosie. Wygrywamy, gdy zestrzelimy wszystkie statki obcych,
a przegrywamy, gdy statki obcych dotrą do dolnej krawędzi mapy.

### Gracz
Gracz ma możliwość poruszania się lewo-prawo za pomocą strzałek oraz przycisków "a" i "d".

Gracz, aby zestrzelić obcych używa przycisku spacji.

Gracz ma 3 życia.

### Obcy
Obcy poruszają się co określony czas w lewo lub prawo, jeżeli jeden z obcych jest blisko krawędzi, wszystkie statki obcych
schodzą o parę pixeli w dół i poruszają się w przeciwnym kierunku. Gdy obcy będą tak nisko jak jest statek gracza
to gracz przegrywa.

Co określony czas losowy obcy strzela w kierunku gracza (w dół).

## Przypadki (problemy)

### Łatwe

Statek Gracza porusza się lewo prawo przy dolnej krawędzi. **EventListener "keydown" na przyciski**

Obcy losowo strzelają. **Wykorzystanie Math.random do ustalenia losowego obcego z tablicy obcych oraz wykorzystanie
setInterval do powtarzania czynności o określony czas**

### Średnie

Obcy poruszają się lewo-prawo oraz po zbliżeniu się do krawędzi spadają o pare pikseli w dół i zmieniają kierunek.
**Stworzenie tablicy obiektów obcych i po każdym requestAnimationFrame albo setTimeout zmienienie ich pozycji.**

### Trudne

Gracza po wciśnięciu spacji wystrzeliwuje pocisk. Pocisk musi wykryć kolizję z obcym, a jeżeli nie uderzy w żaden 
z obcych to musi zniknąć, po uderzeniu w górną krawędź mapy. **Pocisk po każdym requestAnimationFrame musi sprawdzić
pozycje tablicy obcych (poszczególne obiekty obcych) i określenie czy jeden z nich znajduje się w tej samej pozycji mapy, jeżeli tak to usuwamy 
danego obcego z tablicy i pocisk, w przeciwnym wypadku, jeżeli pocisk dotrze do górnej krawędzi, to go niszczymy.**

## Obiekty
    - Gracz (spaceship)
    - Obcy (alien)
    - Strzał (kula)

## Gracz (spaceship)
    Właściwości: pozycja X, pozycja Y, życia, tablica strzalow (kul)
    Metody: Ruch lewo prawo, strzelanie, rysuj obiekt w canvas, odejmij życie

## Obcy (alien)
    Właściwość: pozycja X, pozycja Y, isAlive
    Metody: Ruch lewo prawo dół, strzelanie, rysuj obiekt w canvas

## Strzał (kula)
    Właściwość: pozycja X, pozycja Y
    Metody: Ruch góra dół, rysuj obiekt w canvas

## Funkcje
 - CollisionDetector() sprawdza pozycje tablicy strzałów i tablicy obiektów, jeżeli któreś pozycje się pokrywają 
   to usuwa obcego.
   
 - AlienDetector() sprawdza pozycje obiektów obcych, jeżeli są na dolnej krawędzi to kończymy grę "YOU LOST!".

 - Render() wykonuje się co requestAnimationFrame, a w niej: czyszczenie płótna, rysowanie obcych gracza strzałów i 
wykrywanie kolizji
   
## Stałe
    - canvasWidth
    - canvasHeight
    - spaceshipSize
    - isGameOver
    - 