import { onMounted, onUnmounted, ref } from 'vue';

export function useClickOutside(refElement) {
    const isClickedOutside = ref(false);

    function handleClick(event) {
        isClickedOutside.value = refElement.value && !refElement.value.contains(event.target);
    }

    onMounted(() => {
        document.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });

    return { isClickedOutside };
}
