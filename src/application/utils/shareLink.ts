export const shareLink = async (url?: string) => {
    try {
        await navigator.share({
            url,
        });
    } catch (e) {
        console.log(e);
    }
}