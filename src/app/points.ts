export class Points {
    public points: number = 0;
    public pointsInfoElement = document.querySelector('.points')
    public popup = document.querySelector('.popup')
    public bestScore = document.querySelector('.best-score')

    constructor(private x: number) {
        this.points = x
        this.showPoints()
    }

    addPoints() {
        this.points += 1
        this.showPoints()
    }

    renderNewGame(ctx: CanvasRenderingContext2D, hasWon: boolean | null) {
        this.displayPopup(true)
        if (hasWon && this.popup) {
            this.addScoreToStorage()
            if (this.popup) {
                this.popup.innerHTML = `
            <p class="is-won">Wygrałeś</p>
            <p class="popup-points">Uzyskałeś ${this.points} punktów</p>
            <p class="play-again">Zagraj ponownie [ENTER]</p>`

            }

        } else if (!hasWon && this.popup) {
            this.addScoreToStorage()
            if (this.popup) {
                this.popup.innerHTML = `
            <p class="is-won">Przegrałeś</p>
            <p class="play-again">Zagraj ponownie [ENTER]</p>`

            }
        }
    }

    displayPopup(isActivePopup: boolean) {
        if (this.popup) {
            if (isActivePopup) {
                this.popup.classList.add('popup--active')
            } else {
                this.popup.classList.remove('popup--active')
            }
        }
    }

    showPoints() {
        if (this.pointsInfoElement) {
            this.pointsInfoElement.innerHTML = `Points: ${this.points}`
        }
    }

    restartPoints() {
        this.points = 0;
        this.showPoints()
        this.displayPopup(false)
        this.takeScoreFromStorage()
    }

    addScoreToStorage() {
        if ("localStorage" in window && this.bestScore && localStorage["score"]) {
            const bestScoreFromLocalStorage = Number(localStorage["score"])
            if (bestScoreFromLocalStorage < this.points) {
                localStorage.setItem("score", `${this.points}`)
            }
        } else {
            alert("no localStorage in window");
        }
    }

    takeScoreFromStorage() {
        if ("localStorage" in window) {
            if (localStorage.length > 0) {
                if (this.bestScore) {
                    this.bestScore.innerHTML = `Najlepszy wynik ${localStorage["score"]}`
                }
            }
        } else {
            alert("no localStorage in window");
        }
    }
}
