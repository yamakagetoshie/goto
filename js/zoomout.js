//画像の設定

var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
    if (windowwidth > 768){
      var responsiveImage = [//PC用の画像　数とURLは変更する
        { src: './image/3869146L.jpg'},
        { src: './image/23285703L.jpg'},
        { src: './image/24432513L.jpg'}
      ];
    } else {
      var responsiveImage = [//タブレットサイズ（768px）以下用の画像　数とURLは変更する
        { src: './image/4173251L.jpg' },
        { src: './image/23010763L.jpg' },
        { src: './image/2896119L.jpg' }
      ];
    }

//Vegas全体の設定

$('#slider').vegas({
    overlay: true,//画像の上に網線やドットのオーバーレイパターン画像を指定。
    transition: 'blur',//切り替わりのアニメーション
    transitionDuration: 2000,//切り替わりのアニメーション時間をミリ秒単位で設定
    delay: 10000,//スライド間の遅延をミリ秒単位で設定
    animationDuration: 20000,//スライドアニメーション時間をミリ秒単位で設定
    animation: 'kenburns',//スライドアニメーションの種類
    slides: responsiveImage,//画像設定を読む
  });