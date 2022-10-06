способы взаимодействия

1. через Input и Output() декораторы
2. От ребенка к родителю: через ViewChild декоратор
3. Несвязанные при помощи сервисов и токенов

В первом варианте из плюсов могу отметить простоту использования, хорошо подходит для маленьких компонентов(элементов форм, кнопок и т.д).
Из минусов проблематично следить за приложением в очень cложных проектов и при очень большой вложенности появится Prop-drilling.

Во втором варианте мы можем повесить ref на ребенка и получить все его публичные методы и свойства через декоратор ViewChild, очень удобно подмешать свою логику дочернему компоненту.

Третий вариант с сервисами является очень хорошим решением для создания глупых компонентов, где вся бизнес логика лежит в сервисах, а компоненты просто вызывают методы и получают данные из одного источника, благодоря модульной структуре мы можем подменять наши сервисы. Так же есть возможность управлять данными при помощи токенов, которые мы провайдим в di-контейнере, допустим, мы можем положить в него BehaviorSubject, подписываться на него и изменять его значение в любом компоненте нашего di-контейнера.
К минусу можно отнести сложность понимания для новичков.