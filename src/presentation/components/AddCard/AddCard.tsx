import { Button } from "@src/presentation/ui-kit/Button"
import { Card } from "@src/presentation/ui-kit/Card"
import classNames from "classnames"
import styles from "./AddCard.module.css"
import { useEffect } from "react"
import { paymentStore } from "@src/application/store/paymentStore"
import { observer } from "mobx-react-lite"
import { useFields } from "./useFields"

interface AddCardProps {
    successCb?: (tokenId: number) => void;
}

export const AddCard = observer(({ successCb }: AddCardProps) => {
    const { isAddingNewCard } = paymentStore;

    const { focused, dirtyFields } = useFields();

    const isCardNumberFocused = focused.cardNumber || dirtyFields.cardNumber;
    const isExpiryFocused = focused.expiry || dirtyFields.expiry;
    const isCvvFocused = focused.cvv || dirtyFields.cvv;

    useEffect(() => {
        paymentStore.init();
    }, []);

    useEffect(() => {
        const formElement = document.getElementById('payment-form');
    
        const listener = async (event: Event) => {
          event.preventDefault();
    
          const additionalData = {
            // @ts-ignore
            holder_name: document.getElementById('cardholder-name')?.value,
          }
          
          await paymentStore.addNewCard(additionalData, successCb);
        }
    
        formElement?.addEventListener('submit', listener);
        return () => {
          formElement?.removeEventListener('submit', listener);
        };
    }, [successCb]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Укажите данные вашей карты</div>

            <Card boxShadow={true}>
                <form id="payment-form">
                    <div className={styles.field}>
                        <label className={classNames(styles.label, { [styles.focused]: isCardNumberFocused })}>Номер карты</label>
                        <div id="card-number" className={classNames(styles.inputWrapper, styles.cardNumber)} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={classNames(styles.label, { [styles.focused]: isExpiryFocused })}>Действует до</label>
                            <div id="exp-date" className={styles.inputWrapper} />
                        </div>
                        <div className={styles.field}>
                            <label className={classNames(styles.label, { [styles.focused]: isCvvFocused })}>CVV</label>
                            <div id="cvv" className={styles.inputWrapper} />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label className={classNames(styles.label, { [styles.focused]: isCardNumberFocused })}>Name</label>
                        <input id="cardholder-name" className={styles.inputWrapper} />
                    </div>
                    <div className={styles.field}>
                        <div id="user-agreement" className="input" />
                    </div>

                    <Button
                        variant={'yellow'}
                        type="submit"
                        id="pay_button"
                        isLoading={isAddingNewCard}
                        disabled={isAddingNewCard}
                        withShadow={true}
                    >
                        Добавить карту
                    </Button>
                </form>
            </Card>
      </div>
    );
});
