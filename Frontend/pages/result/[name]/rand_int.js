
export function getNumber(place){
    const a={
        'dubai':9+1,
        'new-york':12+1,
        'paris':6+1,
        'singapore':9+1,
        'london':9+1,
        'rome':10+1,
        'venice':6+1,
        'barcelona':5+1,
        'budapest':7+1,
        'prague':12+1,
        'milan':10+1
    };
    return Math.floor(Math.random() * a[place]);
}
