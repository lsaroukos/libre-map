<?php
/*
Plugin Name: Libre Maps
Description: Adds a shortcode that can be used to add free maps using OpenLayers
Author: Lefteris Saroukos
Version: 0.1
Author URI: https://www.lsaroukos.gr
*/

namespace LSAROUKOS;

/*check if wordpress core has been loaded*/
if( !defined('ABSPATH') )
exit;
 
if(!class_exists( 'LSAROUKOS\LibreMaps' ) ){ //if the class has not been previously defined
class LibreMaps{ 
  
  private __$IDs; 
  public $plugin_name;
  /**
    * initiates class
    */
    function __construct(){
      $this->__IDs = [];
      $this->plugin_name=plugin_basename(__FILE__); //set the file name as the name of the plugin
      add_shortcode('libre-maps', array($this, 'render_HTML'));
      add_action( 'wp_footer', array($this,'load_scripts') );
      add_filter('script_loader_tag', array($this,'add_type_attribute') , 10, 3);
      
    }

    /**
     * create shortcode HTML
     * passign arguments:
     *  points => [libre=maps points='[ [36,78,'hotel'],[43,29,'strore'] ]'
     */
    function render_HTML($atts){
      $atts = shortcode_atts( array(
          'points' => '[]',
      ), $atts, 'libre-maps' );
      $args = array(
          'points' => isset($atts['points'])? str_replace(' ','¤',urldecode($atts['points'])) : '', 
      );
      $date = new \DateTime();
      $this->__IDs[] = $date->format('Ymdhisu');
      ob_start();?>
        <div id="libre-map-<?php echo \end($this->__IDs); ?>" class="libre_map" data-points=<?php echo $args['points']; ?>>
          <div class="map_overlay"></div>
          <img style="display: none;" id="marker-<?php echo \end($this->__IDs); ?>" src="<?php echo plugin_dir_url(__FILE__); ?>img/marker.png">
          <div class="popup"></div>
        </div>
      <?php return ob_get_clean();
    }

    /**
     * enqueues css and js scripts
     */
    function load_scripts(){
      if( $this->__IDs!=[] ){ //if shortcode was used 
        wp_enqueue_script('mapindex',plugin_dir_url( __FILE__ ).'/js/index.js');
        wp_localize_script( 'mapindex', 'MAPS',
          array( 
            'ids'  => $this->__IDs,
          )
        );
        wp_enqueue_script( 'mapsecond-script', plugin_dir_url(__FILE__) . 'js/vendor.js');
        wp_enqueue_script( 'mapscrolling-script', plugin_dir_url(__FILE__) . 'js/map-scrolling.js');
        wp_enqueue_style('maps-style',plugin_dir_url(__FILE__).'css/index.css');
      }
    }

        
    //---handle wp_enqueue_ hook----
    function add_type_attribute($tag, $handle, $src) {
      if( str_contains($handle, 'mapindex') ){
        $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
      }elseif( 'mapsecond-script' == $handle ){
          $tag = '<script type="premodule" src="' . esc_url( $src ) . '"></script>';
      }
      // change the script tag by adding type="module" and return it.
      return $tag;
    }

}}


if(class_exists('LSAROUKOS\LibreMaps') ){
  $maps = new LibreMaps();
}
/*EOF*/
