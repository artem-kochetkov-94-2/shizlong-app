// import styles from './ChooseTime.module.css';
// import { useEffect, useState, useRef } from 'react';
// import { bookStore } from '@src/application/store/bookStore';
// import { observer } from 'mobx-react-lite';
// import { declensionOfHours } from '@src/application/utils/formatDate';

// export const ChooseTime = observer(() => {
//     const { formHours } = bookStore;
//     const [isOpen, setIsOpen] = useState(false);
//     const availableHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]; // Пример значений
//     const selectRef = useRef<HTMLSelectElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isOpen && event.target instanceof Element && !event.target.closest(`.${styles.modulesControlsItem}`)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('click', handleClickOutside);

//         if (isOpen) {
//             selectRef.current?.focus();
//         }

//         return () => document.removeEventListener('click', handleClickOutside);
//     }, [isOpen]);

//     const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         bookStore.setFormHours(Number(e.target.value));
//         bookStore.setPeriod(null);
//         setIsOpen(false);
//     }

//     const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//         e.stopPropagation();
//         setIsOpen(!isOpen);
//     }

//     return (
//         <div className={styles.modulesControlsItem}>
//             {!isOpen && (
//                 <div className={styles.modulesControlsItemLabel} onClick={handleClick}>
//                     на {formHours} {declensionOfHours(formHours)}
//                 </div>
//             )}

//             {isOpen && (
//                 <select
//                     ref={selectRef}
//                     value={formHours}
//                     onChange={handleSelectChange}
//                     className={styles.modulesControlsItemInput}
//                 >
//                     {availableHours.map(hour => (
//                         <option key={hour} value={hour}>
//                             {hour} {declensionOfHours(hour)}
//                         </option>
//                     ))}
//                 </select>
//             )}
//         </div>
//     );
// });
