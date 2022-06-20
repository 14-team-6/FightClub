[![deploy-to-heroku](https://github.com/14-team-6/FightClub/actions/workflows/deploy-to-heroku.yml/badge.svg)](https://github.com/14-team-6/FightClub/actions/workflows/deploy-to-heroku.yml)

# FightClub
Игра - ретро файтинг "из 80х".

Релиз: https://fightclub-vegas.herokuapp.com/

Макеты: https://www.figma.com/file/ZL8FK0h8kpuxQFMwUKHSQe/Fight-Club?node-id=0%3A1

Спрайты котят: https://www.figma.com/file/W4TFEVYmn4cQYCHmreoq4H/Kittens-sprites?node-id=0%3A1

Ассеты: https://disk.yandex.ru/d/IGQN_0FJL51hhw

## Как запустить?
git clone ...

npm install

npm run dev # запустится веб-сервер для разработки

## Механика игры

### Базовые термины
- игрок - человек, играющий в игру
- персонаж - "котик - боец", сущность, которая передвигается по игровому полю, наносит удары итд. Может управляться игроком или ИИ
- ИИ - "искусственный интеллект" - алгоритм, управляющий противником.

### Базовая механика, "чтобы сдать проект":
- при нажатии на "играть" игрок видит прелоадер (в этот момент загружаются ассеты)
- после окончания загрузки попадает на "арену", где игрока "ждет" управляемый ИИ персонаж
- в бою управляет персонажем с помощью курсора / wsad / касаний экрана (для мобилки). Персонаж умеет прыгать, перемещаться вправо-влево, наносить удар мечом
- у каждого персонажа есть характеристики - сила удара, вероятность пробить крит, вероятность уклонения, количество жизни
- противник - управляемый компьютером случайно выбранный персонаж из того же списка, что и для игрока
- противники обмениваются ударами, каждый удар приводит к уменьшению количества жизни
- когда жизнь заканчивается, проигравший умирает
- игра идет два или три раунда (если в первом и втором нет одного победителя, третий раунд - решающий)


**Что такое "обмениваться ударами"?**

Нанесение удара проходит в два этапа. На первом этапе происходит "подготовка удара". Визуально это выглядит как "занесение меча над головой", "замахивание кулаком". В этот момент другой персонаж может совершить какое-то действие - отпрыгнуть, отойти назад, поставить блок итп. Время на "подготовку удара" может меняться в зависимости от характеристик персонажа и великого рандома. Возможности отойти назад должна быть довольно редкой, то есть длительность подготовки удара больше скорости перемещения за границы поражения должна "выпадать" не часто (точные значения надо подбирать на практике).

Каждый "инструмент", позволяющий нанести удар ("кулак", "меч", "огненный торнадо" - что угодно) имеет границы, которые можно представить в виде прямоугольника. Так же как и персонаж имеет эти границы. Пересечение границ "инструмента" и персонажа запускает расчет последствий удара. Разные виды "оружия" имеют разные границы.

Если в персонажа попал удар, визуально отображаем попадание как "скорчился от боли".

Если оба персонажа наносят удар одновременно - учитываем тот удар, который первым "коснулся" противника.

**Перемещение персонажа**

Персонаж может перемещаться влево-вправо и прыгать. В момент прыжка изменение направления или повторный прыжок недоступны. При перемещении лицом персонаж обращен всегда к противнику.

**Как работает ИИ**

Каждый "цикл" игры "смотрим" на ситуацию. Если противник вне зоны досягаемости - двигаемся к нему. Если в зоне досягаемости - наносим удар. Если противник в состоянии "подготовки удара" - отпрыгиваем на свободное место (если есть куда назад - то назад, если сзади места нет - то перепрыгиваем и разворачиваемся лицом после приземления). Сложность регулируется вероятностью не совершить нужное действие. Например, сложность низкая, противник рядом, "бросаем кубик" на отпрыгивание. Выпало 1 из 20 - отпрыгиваем, все остальное - двигаемся назад. Так же сложность может регулироваться "скоростью мышления" (например, игра толко началась - и на низкой сложности ИИ какое-то время стоит и "тупит" вместо того, чтобы бежать и бить).


### Расширенная механика:
- игрок выбирает персонажа для игры.
- фаталити / бруталити. Если последний удар убрал ровно столько жизни, что ее количество стало равно строго 0, игрок может нажать особую комбинацию и увидеть кровавый "ролик"
- уклонение. В момент "подготовки удара" противника персонаж может уклониться, если игрок (или ИИ) "нажмет" соотв. кнопку
- блок. Персонаж может поставить блок. Блок дает вероятность не попадания удара, но "сковывает движения" - персонаж не может прыгать и перемещается медленнее
- стамина. У персонажа добавляется шкала / характеристика "выносливости", в зависимости от ее наличия он может совершать ускорения, двойной прыжок, наносить могучие удары



### Супер расширенная механика:
- перед первым боем игрок читает "комикс" - историю про то, зачем вообще котики сражаются на "арене"
- адаптивная сложность ИИ (если игрок начинает части проигрывать, уменьшать сложность, чтобы не игрок не терял интереса у игре)
- бонусы. С "неба" падают предметы, которые временно увеличивают способности или дают новые
- игра по сети с другими игроками
- монетизация - выбор персонажа за золотые монеты
- монетизация - после поражения необходимости "отдохнуть" и "восстановиться" сколько-то минут реального времени, убираемая за золотые монеты
- монетизация - украшения для персонажа
- монетизация - нфт персонаж
