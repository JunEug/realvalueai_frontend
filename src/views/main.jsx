import React, { useEffect, useState } from "react";
import { fetchListings } from "./api";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import './main.css';


const Wireframe13 = () => {
    const [listings, setListings] = useState([]);
    const { page } = useParams(); // Получаем текущую страницу из URL
    const currentPageNumber = parseInt(page, 10) || 1; // Если нет страницы, то по умолчанию 1

    useEffect(() => {
        async function loadListings() {
            try {
                const data = await fetchListings(currentPageNumber); // Загружаем данные для текущей страницы
                setListings(Object.values(data));
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        }

        loadListings();
    }, [currentPageNumber]);

    return (
        <div className="wireframe13-container">
            <Helmet>
                <title>exported project</title>
            </Helmet>
            <div className="wireframe13-wireframe13">
                <div className="wireframe13-frame162">
                    <div className="wireframe13-top">
                        <div className="wireframe13-fillal">
                            <div className="wireframe13-fixedal">
                                <img
                                    src="/assets/Vector.svg"
                                    alt="logo7364"
                                    className="wireframe13-logo"
                                />
                                <div className="wireframe13-profil">
                                    <img
                                        src="/assets/heart.svg"
                                        alt="interfacefavoriteheartrewardsocialratingmediaheart7364"
                                        className="wireframe13-interfacefavoriteheartrewardsocialratingmediaheart"
                                    />
                                    <div className="wireframe13-icon">
                                        <span className="wireframe13-text10">Профиль</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wireframe13-searchbar1">
                            <div className="wireframe13-midcontainer">
                                <div className="wireframe13-filters">
                                    <div className="wireframe13-btnfilters">
                                        <div className="wireframe13-interfacesettingsliderhorizontaladjustmentadjustco">
                                            <img
                                                src="/assets/filter.svg"
                                                alt="Vector7365"
                                            />
                                        </div>
                                        <span className="wireframe13-text11">Фильтры</span>
                                    </div>
                                </div>
                                <div className="wireframe13-searchbar2">
                                    <div className="wireframe13-interfacesearchglasssearchmagnifying-streamline-core">
                                        <div className="wireframe13-group2">
                                            <img
                                                src="/assets/search.svg"
                                                alt="Vector7366"
                                                className="wireframe13-vector17"
                                            />
                                        </div>
                                    </div>
                                    <span className="wireframe13-text12"> </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wireframe13-card-container">
                        {listings.map((listing, index) => {
                            let firstPhotoUrl = '';
                            try {
                                // Преобразуем строку в массив URL, если она состоит из нескольких ссылок, разделённых запятой
                                const matches = listing.photoUrls.match(/https?:\/\/[^\"]+/g);
                                if (matches && matches.length > 0) {
                                    firstPhotoUrl = matches[0]; // Берём первый URL
                                }
                            } catch (error) {
                                console.error(`Ошибка обработки photoUrls для listingId ${listing.listingId}:`, error);
                            }

                            // Если нет изображений
                            if (!firstPhotoUrl) {
                                console.log(`listingId: ${listing.listingId} не имеет изображений`);
                            }

                            // Извлекаем первое метро
                            const subwayNamesArray = listing.subwayNames
                                .slice(1, -1) // Убираем {}
                                .split(',') // Разделяем по запятой
                                .map(name => name.replace(/\"/g, '').trim()); // Убираем кавычки

                            const firstSubwayName = subwayNamesArray[0] || "Нет данных";

                            let subwayDistancesArray = [];
                            try {
                                const rawData = listing.subwayDistances;

                                // Проверяем, начинается ли строка с { и заканчивается на }
                                if (rawData.startsWith('{') && rawData.endsWith('}')) {

                                    // Удаляем фигурные скобки и разделяем элементы
                                    subwayDistancesArray = rawData
                                        .slice(1, -1) // Убираем фигурные скобки {}
                                        .split(',') // Разделяем строку по запятой
                                        .map(distance => distance.replace(/"/g, '').trim()) // Убираем кавычки и пробелы
                                        .map(distance => parseFloat(distance)) // Преобразуем в числа
                                        .filter(distance => !isNaN(distance)); // Убираем некорректные значения
                                } else {
                                    console.log("Неизвестный формат:", rawData);
                                }
                            } catch (error) {
                                console.error("Ошибка обработки subwayDistances:", error, listing.subwayDistances);
                            }

                            const firstSubwayDistance = subwayDistancesArray.length > 0
                                ? `${subwayDistancesArray[0]} км`
                                : "Нет данных";

                            return (
                                <div key={listing.listingId} className="wireframe13-card">
                                    <img
                                        src={firstPhotoUrl || 'placeholder.jpg'} // Если нет изображения, используем плейсхолдер
                                        alt={`Фото не найдено для listingId ${listing.listingId}`}
                                        className="wireframe13-rectangle47"
                                    />
                                    <div className="wireframe13-description1">
                                        <div className="wireframe13-chars">
                        <span className="wireframe13-text13">
                            {listing.rooms}-комн. квартира, {Math.round(listing.area)} м², {listing.floor}/{listing.house_floors} этаж
                        </span>
                                        </div>
                                        <div className="wireframe13-description2">
                                            <div className="wireframe13-frame81">
                                                <span className="wireframe13-text14">
                                                    <span className="wireframe13-text15">не выгоднее аналогов на</span>
                                                    <span className="wireframe13-text16">
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: ' ',
                                                            }}
                                                        />
                                                    </span>
                                                    <span>4%</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="wireframe13-description2">
                                            <div className="wireframe13-frame86">
                                                <div className="wireframe13-frame84">
                                                    <div
                                                        className="wireframe13-travelmaplocationpinnavigationmapmapspingpslocatio1">
                                                        <div className="wireframe13-group3">
                                                            <img
                                                                src="/assets/location.svg"
                                                                alt="Vector7368"
                                                                className="wireframe13-vector19"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="wireframe13-frame82">
                                                        <span className="wireframe13-text18">{firstSubwayName}</span>
                                                        <img
                                                            src="/assets/dot.svg"
                                                            alt="Rectangle577368"
                                                            className="wireframe13-rectangle57"
                                                        />
                                                        <span className="wireframe13-text19">{firstSubwayDistance} км</span>
                                                    </div>
                                                </div>
                                                <div className="wireframe13-frame85">
                                                    <div
                                                        className="wireframe13-travelmaplocationpinnavigationmapmapspingpslocatio2">
                                                        <div className="wireframe13-group4">
                                                            <img
                                                                src="/assets/location.svg"
                                                                alt="Vector7369"
                                                                className="wireframe13-vector21"
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="wireframe13-text20">{listing.address}</span>
                                                </div>
                                            </div>
                                            <span className="wireframe13-text21">
                                                {listing.description}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="wireframe13-prices">
                                        <div className="wireframe13-staticprices">
                <span className="wireframe13-text22">
                  Цены на агрегаторах недвижимости
                </span>
                                        </div>
                                        <div className="wireframe13-markets">
                                            <div className="wireframe13-frame101">
                                                <div className="wireframe13-frame921">
                                                    <span className="wireframe13-text23">Домклик</span>
                                                    <span className="wireframe13-text24">
                      {Number(listing.pricePerSqm).toLocaleString('ru-RU')} ₽ за м2
                    </span>
                                                </div>
                                                <a
                                                    href={listing.listingUrl} // Ссылка на объект
                                                    target="_blank" // Открывает в новой вкладке
                                                    rel="noopener noreferrer" // Повышает безопасность
                                                    className="wireframe13-price-link" // Добавляем класс для стилизации
                                                >
                                                    <div className="wireframe13-frame931">
                                                        <span
                                                            className="wireframe13-text25">{Number(listing.price).toLocaleString('ru-RU')} ₽</span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="wireframe13-frame100">
                                                <div className="wireframe13-frame922">
                                                <span className="wireframe13-text26">Циан</span>
                                                    <span className="wireframe13-text27">
                      - ₽ за м2
                    </span>
                                                </div>
                                                <div className="wireframe13-frame932">
                                                    <span className="wireframe13-text28">- ₽</span>
                                                </div>
                                            </div>
                                            <div className="wireframe13-frame102">
                                                <div className="wireframe13-frame923">
                                                    <span className="wireframe13-text29">Авито</span>
                                                    <span className="wireframe13-text30">- ₽ за м2</span>
                                                </div>
                                                <div className="wireframe13-frame933">
                                                    <span className="wireframe13-text31">- ₽</span>
                                                </div>
                                            </div>
                                            <div className="wireframe13-frame103">
                                                <div className="wireframe13-frame924">
                    <span className="wireframe13-text32">
                      Яндекс Недвижимость
                    </span>
                                                    <span className="wireframe13-text33">
                      - за м2
                    </span>
                                                </div>
                                                <div className="wireframe13-frame934">
                                                    <span className="wireframe13-text34">- ₽</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                            ;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wireframe13;
