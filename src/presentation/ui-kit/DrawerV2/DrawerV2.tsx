import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import styles from './DrawerV2.module.css';

interface DrawerV2Props {
    children: React.ReactNode;
    overflowHeight?: number;
    open?: boolean;
    fullScreen?: boolean;
    onChange?: (open: boolean) => void;
}

export const DrawerV2 = ({
    children,
    overflowHeight = 74,
    fullScreen = false,
    ...rest
}: DrawerV2Props) => {
    return (
        <SwipeableBottomSheet
            overflowHeight={overflowHeight}
            style={{ zIndex: 1000 }}
            fullScreen={fullScreen}
            {...rest}
        >
            <div className={styles.divider} />
            {children}
        </SwipeableBottomSheet>
    );
};
