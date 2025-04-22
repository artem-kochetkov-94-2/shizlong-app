import { locationStore } from '@src/application/store/locationStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@presentation/ui-kit/Button';
import styles from './CashierFooter.module.css';
import classNames from 'classnames';
import { Routes } from '@src/routes';
import { observer } from 'mobx-react-lite';

interface CashierFooterProps {
    snapTo: (snap: number) => void;
    snap: number;
}

export const CashierFooter = observer(({ snap, snapTo }: CashierFooterProps) => {
    const navigate = useNavigate();
    const { sectors } = locationStore;

    return (
        <div className={classNames(styles.footer, { [styles.shortFooter]: snap === 2 })}>
            <Button
                variant='yellow'
                onClick={() => {
                    locationStore.choosePlace();
                    if (sectors.length === 1) {
                        navigate(Routes.Sector.replace(':id', sectors[0].id.toString()));
                    } else if (snap === 0) {
                        snapTo(1);
                    }
                }}
            >
                К секторам пляжа
            </Button>
        </div>
    );
});
