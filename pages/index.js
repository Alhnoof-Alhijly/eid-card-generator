import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [name, setName] = useState('');
    const [kind, setKind] = useState('');
    const [checkCard, setCheckCard] = useState(false);
    const [cardType, setCardType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            alert('ادخل اسمك.');
            return;
        }

        try {
            const response = await axios.post('/api/generateCard', {
                Name: name,
                Kind: kind,
                CheckCard: checkCard ? 'on' : '',
                cardType,
            });

            // Create a link element
            const link = document.createElement('a');
            link.href = `/img/Upload/${response.data.image}`;
            link.download = 'your_card_image.jpg'; // You can set the desired filename here
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles['form-wrapper']}>
                <h1 className={styles.title}>صورة تهنئة لعيد الأضحى المبارك</h1>
                <p className={`${styles.textCenter} ${styles.marginTopNegative}`}>
                    يتقدم رئيس وأعضاء مجلس الإدارة والأمين العام لغرفة المدينة المنورة وجميع منسوبيها بتهنئتكم بحلول عيد الأضحى المبارك
                </p>
                <p className={`${styles.textCenter} ${styles.marginTopSmNegative}`}>
                    ادخل اسمك واحصل على كرت خاص بك
                </p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={`${styles['form-group']} ${styles.textRight}`}>
                        <input
                            name="Name"
                            id="Name"
                            className={styles['form-control']}
                            placeholder="الاسم"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={`${styles['form-check']} ${styles.textRight}`}>
                        <input
                            className={styles['form-check-input']}
                            type="checkbox"
                            name="CheckCard"
                            id="CheckCard"
                            checked={checkCard}
                            onChange={(e) => setCheckCard(e.target.checked)}
                        />
                        <label className={styles['form-check-label']} htmlFor="CheckCard">
                            البطاقة غير الرسمية
                        </label>
                    </div>
                    <hr />
                    <h3 className={styles.textRight}>نوع البطاقة</h3>
                    <div className={styles.radioGroup}>
                        <label className={styles.radioImg}>
                            <input
                                type="radio"
                                className={styles['form-check-input']}
                                name="cardType"
                                value="1"
                                onChange={(e) => setCardType(e.target.value)}
                            />
                            <div
                                className={`${styles.image} ${styles.radioImage}`}
                                style={{ backgroundImage: 'url(/images/eid-1-2024.jpg)' }}
                            ></div>
                        </label>
                        <label className={styles.radioImg}>
                            <input
                                type="radio"
                                className={styles['form-check-input']}
                                name="cardType"
                                value="2"
                                onChange={(e) => setCardType(e.target.value)}
                            />
                            <div
                                className={`${styles.image} ${styles.radioImage}`}
                                style={{ backgroundImage: 'url(/images/eid-2-2024.jpg)' }}
                            ></div>
                        </label>
                    </div>
                    <div className={styles['form-group']}>
                        <button type="submit" className={styles.btnSubmit}>
                            تحميل البطاقة
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}