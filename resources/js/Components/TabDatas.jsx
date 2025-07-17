import { useRef, useEffect, useState } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { converterData } from "@/dates";
import styles from "../../scss/TabDatas.module.scss";

export default function TabDatas({ datas, currentTab, setCurrentData }) {
    const scrollRef = useRef();
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    };

    useEffect(() => {
        checkScroll();

        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        // 🔽 Scroll automático até a aba ativa
        const activeTab = el.querySelector(".nav-link.active");
        if (activeTab) {
            const offsetLeft = activeTab.offsetLeft;
            const tabWidth = activeTab.offsetWidth;
            const scrollPos = offsetLeft - (el.clientWidth - tabWidth) / 2;
            el.scrollTo({ left: scrollPos, behavior: "smooth" });
        }

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [datas, currentTab]);

    if (!datas || datas.length === 0) return null;

    return (
        <div className={`position-relative ${styles.tabWrapper}`}>
            {showLeft && (
                <Button
                    variant="light"
                    className={`${styles.scrollBtn} ${styles.left}`}
                    onClick={scrollLeft}
                >
                    <ChevronLeft />
                </Button>
            )}

            <div className={styles.tabScrollArea} ref={scrollRef}>
                <Tabs
                    activeKey={currentTab || datas[0]}
                    onSelect={(k) => setCurrentData(k)}
                    className="flex-nowrap"
                    variant="pills"
                >
                    {datas.map((data) => (
                        <Tab
                            eventKey={data}
                            title={converterData(data)}
                            key={data}
                            tabClassName="small text-nowrap"
                        />
                    ))}
                </Tabs>
            </div>

            {showRight && (
                <Button
                    variant="light"
                    className={`${styles.scrollBtn} ${styles.right}`}
                    onClick={scrollRight}
                >
                    <ChevronRight />
                </Button>
            )}
        </div>
    );
}
