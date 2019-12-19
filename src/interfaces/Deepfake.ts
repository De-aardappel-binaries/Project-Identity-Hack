interface Deepfake {
    imageUrlOriginal: string,
    imageUrlFake: string,
    differenceButton1: DifferenceButton,
    differenceButton2: DifferenceButton
}

interface DifferenceButton {
    x: number,
    y: number,
    width: number,
    height: number
}