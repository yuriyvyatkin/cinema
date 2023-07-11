Nнформационная система для администрирования залов, сеансов и предварительного бронирования билетов.

## Общая инфомрация
* Проект создан при помощи Laravel 9.18.0, PHP 8.1.1, SQLite, JS, CSS, HTML
* Команда для локального развёртывания - "composer app-deploy"

## Сущности
*Кинозал*

Помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал - прямоугольный, состоит из N * M различных зрительских мест.

*Зрительское место*

Место в кинозале. Зрительские места могут быть VIP и обычные.

*Фильм*

Информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.

*Сеанс*

Сеанс - это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.

*Билет*

QR-код c уникальным кодом бронирования, в котором обязательно указаны место, ряд, сеанс; Билет действителен строго на свой сеанс. Для генерации QR-кода можно использовать http://phpqrcode.sourceforge.net/

## Роли пользователей системы
* Администратор - авторизованный пользователь
* Гость - неавторизованный посетитель сайта

### Возможности администратора
* Создание/редактирование залов
* Создание/редактирование фильмов
* Настройка цен
* Создание/редактирование расписания показов фильмов

### Возможности гостя
* Просмотр расписания
* Просмотр фильмов
* Выбор места в кинозале
* Бронирование билета
