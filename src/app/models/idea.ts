export class Idea {
    public id: string;
    public created_at: number;

    public content: string;
    public impact: number;
    public ease: number;
    public confidence: number;
    public average_score: number;

    constructor() {
        this.content = '';
        this.impact = 10;
        this.ease = 10;
        this.confidence = 10;
        this.average_score = 10;
    }

    toString(): string {
        return 'Title: ' + this.content +
            ', Impact: ' + this.impact +
            ', Ease: ' + this.ease +
            ', Confidence: ' + this.confidence +
            ', Average: ' + this.average_score;
    }
}
