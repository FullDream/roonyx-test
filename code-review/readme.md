1. в шаболоне ошибка с тегом, открывается div, а закрывается button
2. Убрать нижнее подчеркивание у authService в конструкторе, у нас и так обозначено что это приватный метод.
3. Перенести все содержимое конструктора в хук ngOnInit, подписки не должны быть в конструкторе
4. Избавиться от метода getUserName(), если есть возможность, свойство user сделать публичным и в шаболоне обращаться user?.name, но если это свойство должно быть приватным - то добавить гетер и сеттер с именами user, и так же обраться в шаболоне user?.name.
5. Предусмотреть возможность отписки от authService.user при уничтожении компонета, для предотвращения утечки памяти, создать булевый Subject, допустим destroyed$, и добавить в authService.user в цепочку перед subscribe pipe c takeUntil(this.destroyed$), в хуке ngOnDestroy некстить true в наш destroyed$