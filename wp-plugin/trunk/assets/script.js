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

  let pluginImgUrl = AspieSoftWPPluginIconsDefaultImageUrl;
  if(!pluginImgUrl.match(new RegExp('^https?://([\\w_\\-\\.]*)'+window.location.host.replace(/[^\w_\-\.:]/g, ''))) && !pluginImgUrl.startsWith('/')){
    // if the local fallback image fails to load with a same domain url
    pluginImgUrl = undefined;
  }

  $('.wp-list-table.plugins #the-list tr').each(function(){
    const slug = this.getAttribute('data-slug');

    let size = 256;
    let type = 'png';
    let doneTrying = false;

    const img = $(`<img class="wp-plugin-icon" src="https://ps.w.org/${slug}/assets/icon-${size}x${size}.${type}">`);
    $('.plugin-title', this).prepend(img);

    function tryNewImage(){
      if(size === 256){
        size = 128;
        return;
      }
      switch(type){
        case 'png':
          type = 'jpg';
          break;
        case 'jpg':
          type = 'webP';
          break;
        case 'webP':
          type = 'webp';
          break;
        case 'webp':
          type = 'jpeg';
          break;
        case 'jpeg':
          type = 'gif';
          break;
        default:
          doneTrying = true;
          break;
      }
    }

    img.on('error', function(){
      if(doneTrying){
        this.style.display = 'none';
        return;
      }

      tryNewImage();

      if(!doneTrying){
        this.src = `https://ps.w.org/${slug}/assets/icon-${size}x${size}.${type}`;
      }else if(pluginImgUrl && this.src !== pluginImgUrl){
        this.src = pluginImgUrl;
      }else{
        this.style.display = 'none';
      }
    });
  });

})(jQuery);
