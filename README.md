# cmsxfy 
browserifyでmithril & coffeeを使う場合に使用。
テストやってクオリティ上がったら、npmに公開するかも。

mithrilifyを基に改良している。
https://www.npmjs.com/package/mithrilify

一応動くようになった。alphaテスト版。npmには公開していない。

◆gulpfile.coffeeの例
transformの"coffeeify"の前に指定
```
gulp.task 'coffee', ->
  gulp
    .src 'src/app.js', read: false
    .pipe browserify
      transform: ["cmsxfy","coffeeify"]
      extensions: ['.coffee','.js']
      debug: true
    .pipe rename 'app.js'
    .pipe gulp.dest './dist'
```

1.coffee & jsx風に書く
```
do ->
    #require
    m = require "mithril"

    #module
    module = 

        #
        # controller
        #
        controller: ->
            return @

        #
        # view
        #
        view: (ctrl)->
            return [
                <div>aaaaaaaa</div>
                <div>aaaaaaaa</div>
                <div>aaaaaaaa</div>
            ]

    return false
```

2.cmsxfyによってcoffeeでエラーが出ない形式に変換
```
do ->
    #require
    m = require "mithril"

    #module
    module = 

        #
        # controller
        #
        controller: ->
            return @

        #
        # view
        #
        view: (ctrl)->
            return [
                { tag: "div", attrs: {}, children: ["aaaaaaaa"] },
                { tag: "div", attrs: {}, children: ["aaaaaaaa"] },
                { tag: "div", attrs: {}, children: ["aaaaaaaa"] }
            ]

    return false
```

3.coffeeifyによってJSに変換
```
(function() {
  var m, module;
  m = require("mithril");
  module = {
    controller: function() {
      return this;
    },
    view: function(ctrl) {
      return [
          { tag: "div", attrs: {}, children: ["aaaaaaaa"] },
          { tag: "div", attrs: {}, children: ["aaaaaaaa"] },
          { tag: "div", attrs: {}, children: ["aaaaaaaa"] }
      ];
    }
  };
  return false;
})();

```

4.その後browserifyが実行される。
