'use strict';

angular.module('ecApp')
  .factory('glossary', function ($q, $http) {
    var currentLanguage = 'english';

    var english = {
      'sitename': 'Easy Cooking',
      'sitesubname': 'quick recipes for lazy people',
      'home': 'Home',
      'login': 'Login',
      'signup': 'Sign up',
      'hello': 'Hello',
      'logout': 'Logout',
      'hebrew': 'עברית',
      'russian': 'Русский',
      'english': 'English (USA)',
      'sendrecipe': 'Send recipe',
      'newrecipe': 'New recipe',
      'search': 'Search ...',
      'close': 'Close',
      'loginfb': 'Login with Facebook',
      'cancel': 'Cancel',
      'needpassword': 'Password required',
      'needemail': 'Email required',
      'invalidemail': 'This is not a valid email.',
      'email': 'Email',
      'password': 'Password',
      'name': 'Name',
      'needname': 'Name required',
      'minimumshort': 'min.',
      'symbols': 'symbols',
      'shortpassword': 'Password must be at least',
      'characters': 'characters',
      'confirmpassword': 'Confirm Password',
      'passwordnotmatch': 'Passwords do not match',
      'recipes': 'Recipes',
      'recipesdescription': 'A huge number of recipes - easy to cook, affordable ingredients and absolutely delicious!',
      'inmyfridge': 'In my Fridge',
      'inmyfridgedescription': 'Stayed late at the office, didn’t have the chance to drop by the store ... Tell us what products you\'ve found in the kitchen and we will help you cook the best meal for dinner',
      'party': 'Dinner Party',
      'partydescription': 'Waiting for guests? Not a problem. Easy Cooking offers menu options for party: guests will be amazed and you will be proud',
      'anyone': 'Anyone can cook!',
      'quickrecipes': 'Quick recipes for people who have no time for cooking or too lazy',
      'features': 'Features',
      'recipeadded': 'Recipe added and will appear in a shot time. You may continue adding recipes',
      'recipe': 'recipe',
      'grantor': 'Grantor',
      'fullname': 'Full name',
      'recipename': 'Recipe name',
      'avatar': 'Avatar',
      'category': 'Category',
      'cousine': 'Cousine',
      'cookingtime': 'Cooking time',
      'minutesshort': 'min.',
      'description': 'Description',
      'left': 'Left',
      'ingredients': 'Ingredients',
      'quantity': 'Quantity',
      'nametitle': 'Name',
      'removeingredient': 'Remove ingredient',
      'addingredient': 'Add ingredient',
      'instructions': 'Instructions',
      'instruction': 'Instruction',
      'image': 'Image',
      'dropimage': 'Drag and drop or click here',
      'edit': 'Edit',
      'removeinstruction': 'Remove instruction',
      'addinstruction': 'Add instruction',
      'mainimage': 'Recipe main image',
      'notes': 'Notes',
      'removenote': 'Remove note',
      'addnote': 'Add note',
      'approveforview': 'Approve for public view',
      'approve': 'Approve',
      'send': 'Send',
      'bepatient': 'Be patient! Your recipe should appear in a short time',
      'selectcategory': 'Select category',
      'add': 'Add',
      'deleterecipe': 'Delete recipe',
      'confirmdelete': 'Recipe will be deleted, are you sure ?',
      'editrecipe': 'Edit recipe',
      'all': 'All',
      'found': 'found',
      'viewall': 'View all recipes',
      'newonly': 'New recipes only',
      'filetoolarge': 'File must be smaller than',
      'mb': 'MB',
      'invalidfiletype': 'Invalid file type.  File must be one of following types',
      'peopleread': 'people read recipe',
      'peoplevote': 'people vote',
      'overallrating': 'Overall rating:',
      'yourrating': 'Your rating:',
      'dragrating': 'Drag or click on bar and',
      'rateit': 'Rate it!',
      'inmyfridgeprompt':'Please enter comma separated list of products you found in the fridge:',
      'typehere': 'Type here ...',
      'feedme': 'Feed me!',
      'inmyfridgerecipes': 'In my Fridge Recipes',
      'for': 'for:'
    };
    var russian = {
      'sitename': 'Быстрая кухня',
      'sitesubname': 'лёгкие рецепты для ленивых',
      'home': 'Домой',
      'login': 'Войти',
      'signup': 'Запись',
      'hello': 'Привет',
      'logout': 'Выйти',
      'hebrew': 'עברית',
      'russian': 'Русский',
      'english': 'English (USA)',
      'sendrecipe': 'Отправить ​​рецепт',
      'newrecipe': 'Новый ​​рецепт',
      'search': 'Поиск ...',
      'close': 'Закрыть',
      'loginfb': 'Войти через Facebook',
      'cancel': 'Отменить',
      'needpassword': 'Требуется пароль',
      'needemail': 'Требуется адрес эл. почты',
      'invalidemail': 'Неправильный адрес эл. почты',
      'email': 'Email',
      'password': 'Пароль',
      'name': 'Имя',
      'needname': 'Требуется имя',
      'minimumshort': 'min.',
      'symbols': 'символов',
      'shortpassword': 'Пароль должен быть не менее',
      'characters': 'символов',
      'confirmpassword': 'Подтвердите пароль',
      'passwordnotmatch': 'Пароли не совпадают',
      'recipes': 'Рецепты',
      'recipesdescription': 'Огромное количество рецептов – легкие в приготовлении, из доступных ингредиентов и очень вкусные!',
      'myfridge': 'В моем холодильнике ',
      'myfridgedescription': 'Задержались на работе, не успели заскочить в магазин ... Скажите нам, какие продукты вы нашли на кухне, и мы поможем вам быстро приготовить вкусный ужин (обед или завтрак) ',
      'party': 'Званый вечер',
      'partydescription': 'Ждёте гостей? Не проблема. ”Быстрая кухня” предлагает варианты меню: гости будут поражены, вы будете гордиться.',
      'anyone': 'Любой человек умеет готовить!',
      'quickrecipes': 'Быстрые рецепты для людей, у которых нет времени или … просто лень',
      'features': 'Темы',
      'recipeadded': 'Рецепт добавлен. Вы можете продолжать добавлять рецепты',
      'recipe': 'рецепт',
      'grantor': 'Даритель',
      'fullname': 'Полное имя',
      'recipename': 'Название рецепта',
      'avatar': 'Фото',
      'category': 'Категория',
      'cousine': 'Кухня',
      'cookingtime': 'Время приготовления',
      'minutesshort': 'Мин.',
      'description': 'Описание',
      'left': 'Осталось',
      'ingredients': 'Ингредиенты',
      'quantity': 'Количество',
      'nametitle': 'Наименование',
      'removeingredient': 'Удалить ингредиент',
      'addingredient': 'Добавить ингредиент',
      'instructions': 'Инструкции',
      'instruction': 'Инструкция',
      'image': 'Фото',
      'dropimage': 'Перетащите или нажмите здесь',
      'edit': 'Редактировать',
      'removeinstruction': 'Удалить инструкцию',
      'addinstruction': 'Добавить инструкцию',
      'mainimage': 'Основное изображение рецепта',
      'notes': 'Примечания',
      'removenote': 'Удалить примечание',
      'addnote': 'Добавить примечание',
      'approveforview': 'Разрешить публичный просмотр',
      'approve': 'Разрешить',
      'send': 'Отправить',
      'bepatient': 'Будьте терпеливы! Ваш рецепт появится в скором времени.',
      'selectcategory': 'Выберите категорию',
      'add': 'Добавить',
      'deleterecipe': 'Удалить рецепт',
      'confirmdelete': 'Удалить рецепт?',
      'editrecipe': 'Редактировать рецепт',
      'all': 'Все',
      'found': 'найдено',
      'viewall': 'Показать все рецепты',
      'newonly': 'Только новые рецепты',
      'filetoolarge': 'Файл должен быть меньше, чем',
      'mb': 'МБ',
      'invalidfiletype': 'Неверный тип файла. Файл должен быть одного из следующих типов:',
      'peopleread': 'человек читали рецепт',
      'peoplevote': 'человек проголосовали',
      'overallrating': 'Общая оценка:',
      'yourrating': 'Ваша оценка:',
      'dragrating': 'Перетащите или нажмите на полоску и',
      'rateit': 'Оцените!'
    };

    return {
      getGlossary: function() {
        var gloss = [];

        switch (currentLanguage){
          case 'english':
            gloss = english;
            break;
          case 'russian':
            gloss = russian;
            break;
          default:
            gloss = english;
            break;
        }

        return gloss;
      },

      getCurrentLanguage: function(){
        return currentLanguage;
      },

      changeLanguage: function(newLang){
        /*var deferred = $q.defer();

        $http.get('/lang/', {lang: newLang})
          .success(function(data) {
            currentLanguage = newLang;
            deferred.resolve(data);
          }).
          error(function(err) {
            deferred.reject(err);
          });

        return deferred.promise;*/

        currentLanguage = newLang;

        switch (newLang){
          case 'russian':
            return russian;
          default:
            return english;
        }
      }
    }
  });
