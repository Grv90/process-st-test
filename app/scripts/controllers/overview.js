'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('overviewCtrl', function($scope, $state) {


        $(function() {
            'use strict';
            $('#fileupload').fileupload({
                url: "https://upload.wistia.com/?api_password=bb09e9a4d27b28876249c5f055e96393b140826e92e76f9ed644ecf5c9938a83",
                dataType: 'json',
                replaceFileInput: false,
                autoUpload: true,
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                previewMaxWidth: 300,
                previewMaxHeight: 200,
                previewCrop: true,
                add: function(e, data) {
                    $("#submit").off('click').on('click', function() {
                        data.submit();
                       
                    $('.message').text("");
                    });

                },
                progressall: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );

                },
                complete: function(response) {
                    // Stop the progress spinner
                    console.log("uploaded Success")
                },
                done: function(e, data) {
                    var response = jQuery.parseJSON(data.jqXHR.responseText);
                    console.log(response);
                    var id = response.hashed_id;
                    var videoSrc = "https://fast.wistia.com/embed/iframe/" + id + "?version=v1&controlsVisibleOnLoad=true&videoFoam=true&autoPlay=true&playerColor=aae3d8";
                    var html = "<div>Video Uploaded Successfully to <i><b> Wistia.</b><i></div>";
                    $('.message').append($(html));
                    $('#iframe_diplayedVideo').attr('src', videoSrc)



                },
                fail: function(e, data) {
                  
                      $('.message').text(data.jqXHR.responseJSON.error);
                }


            })
        })
    });