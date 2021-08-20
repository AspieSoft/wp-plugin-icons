<?php
/**
* @package AspieSoftWPPluginIcons
*/
/*
Plugin Name: AspieSoft WP Plugin Icons
Plugin URI: https://github.com/AspieSoft/wp-plugin-icons
Description: Puts icons next to the wordpress plugins in your installed plugins list to make navigation easier.
Version: 1.0.3
Author: AspieSoft
Author URI: https://www.aspiesoft.com
License: GPLv2 or later
Text Domain: aspiesoft-wp-plugin-icons
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/


if(!defined('ABSPATH')){
  http_response_code(404);
  die('404 Not Found');
}

if(!class_exists('AspieSoft_WPPluginIcons')){

  class AspieSoft_WPPluginIcons{

    public $pluginName;
    public $ver = '1.0.3';

    function __construct(){
      $this->pluginName = plugin_basename(__FILE__);
    }


    function register(){
      if(is_admin()){
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue'));
      }
    }

    public function activate(){
      //flush_rewrite_rules();
    }

    public function deactivate(){
      //flush_rewrite_rules();
    }

    function admin_enqueue(){
      wp_enqueue_style('AspieSoft_WPPluginIcons', plugins_url('/assets/style.css', __FILE__), array(), $this->ver);
      wp_enqueue_script('AspieSoft_WPPluginIcons', plugins_url('/assets/script.js', __FILE__), array('jquery'), $this->ver, true);
      wp_add_inline_script('AspieSoft_WPPluginIcons', ';var AspieSoftWPPluginIconsDefaultImageUrl = \'' . plugins_url('/assets/plugin-icon.jpg', __FILE__) . '\';', 'before');
    }

  }

  $aspieSoft_WPPluginIcons = new AspieSoft_WPPluginIcons();
  $aspieSoft_WPPluginIcons->register();

  register_activation_hook(__FILE__, array($aspieSoft_WPPluginIcons, 'activate'));
  register_deactivation_hook(__FILE__, array($aspieSoft_WPPluginIcons, 'deactivate'));

}
