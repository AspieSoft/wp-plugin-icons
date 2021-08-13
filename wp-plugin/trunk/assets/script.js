/*
The MIT License

Copyright (c) 2021 aspiesoftweb@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

;(function($){
  if(!window.location.pathname.endsWith('plugins.php') && !window.location.pathname.endsWith('plugins')){
    return;
  }

  $('.wp-list-table.plugins #the-list tr').each(function(){
    const slug = this.getAttribute('data-slug');
    const img = $(`<img class="wp-plugin-icon" src="https://ps.w.org/${slug}/assets/icon-128x128.png">`);
    $('.plugin-title', this).prepend(img);
    img.on('error', function(){
      if(this.src !== window.location.origin+'/wp-content/plugins/aspiesoft-wp-plugin-icons/assets/plugin-icon.jpg'){
        this.src = window.location.origin+'/wp-content/plugins/aspiesoft-wp-plugin-icons/assets/plugin-icon.jpg';
      }else{
        this.style.display = 'none';
      }
    });
  });

})(jQuery);
