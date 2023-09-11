export function getTextColor(difference: number) {
    if (difference > 0) {
      return 'green';
    } else if (difference < 0) {
      return 'red';
    }
    return 'black';
}
