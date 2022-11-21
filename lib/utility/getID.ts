export default () => {
    const id = Math.floor(performance.now() * 100_000_000_000);
    return id;
}
