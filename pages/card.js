import { useRouter } from 'next/router';
import styles from '../styles/Card.module.css'; // Import styles from Card.module.css

export default function Card() {
    const router = useRouter();
    const { image, name } = router.query;

    return (
        <div className={styles.container}> {/* Use styles from Card.module.css */}
            <h1 className={`${styles.title} ${styles.textRight}`}>صورة تهنئة لعيد الأضحى المبارك</h1>
            <div className={styles.textRight}>
                {/* <h4 className={styles.subtitle}>{name}</h4> */}
                {/* <hr /> */}
                <div className="row">
                    <div className="col-sm-2">
                        <img src={`/img/Upload/${image}`} className={`img-fluid ${styles.cardImage}`} alt="Eid Card" />
                    </div>
                </div>
            </div>
            <div className={styles.cardContainer}>
                <a href={`/img/Upload/${image}`} target="_blank" download="True" className={`btn btn-lg mb-3 ${styles.btnDownload}`}>
                    تحميل الصورة
                </a>
            </div>
        </div>
    );
}