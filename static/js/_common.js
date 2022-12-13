/* �뚯썝 �뺣낫 �뺢퇋�� */
var id_regexp = /^(?=.*[a-z])[a-z0-9_]{5,20}$/; // �곷Ц, �곷Ц+�レ옄 媛���
var email_regexp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
var nick_regexp  = /^[a-zA-Z媛�-��]{2,10}$/; // 援�Ц �먮뒗 �곷Ц 2�� �댁긽~10�� �댄븯
var pw_regexp = /^(?=.*[a-z])(?=.*[~!@#$%^&*])(?=.*[0-9])[a-z0-9~!@#$%^&*]{9,15}$/; // �곷Ц �뚮Ц��, �レ옄, �뱀닔臾몄옄 �ы븿, 9-15�� �대궡(�ъ슜 媛��ν븳 �뱀닔臾몄옄 : ~!@#$%^&*)
var hp_regexp = /^01([0|1|6|7|8|9])\d{7,8}$/;

function tinymce_init() {
    tinymce.init({
        selector: "textarea[name='content']",
        plugins: "autolink link image imagetools lists charmap textcolor table",
        menu: {
            edit: { title: "Edit", items: "undo redo | cut copy paste | selectall | searchreplace" },
            format: { title: "Format", items: "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat" },
            table: { title: "Table", items: "inserttable tableprops deletetable row column cell" },
        },
        toolbar: "fontsizeselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link code image",
        fontsize_formats: "11px 12px 14px 16px 18px 24px 36px 48px",
        imagetools_toolbar: "rotateleft rotateright | flipv fliph | imageoptions",
        target_list: false,
        height: 400,
        resize: false,
        branding: false,
        image_title: true,
        forced_root_block: false,
        force_br_newlines: true,
        force_p_newlines: false,
        relative_urls: false,
        remove_script_host: false,
        file_picker_types: "image",
        file_picker_callback: function(cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", ".jpg,.jpeg,.png");
            input.onchange = function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    var id = "blobid" + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(",")[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
            };

            input.click();
        },
        images_reuse_filename: true,
        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/static/plugin/tinymce/file_upload.php');
          
            xhr.onload = function() {
                var json;
            
                if (xhr.status != 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }
            
                json = JSON.parse(xhr.responseText);
                if (!json || typeof json.data.img != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.data.img);
            };
          
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
          
            xhr.send(formData);
        },
        language: "ko_KR",
    });
}

function tinymce_init_m(id) {
    var selector = (id === undefined) ? 'textarea' : '#' + id;

    tinymce.init({
        selector: selector,
        plugins: "image imagetools link",
        menubar: false,
        toolbar: "alignleft aligncenter alignright alignjustify | image | link",
        imagetools_toolbar: "rotateleft rotateright | flipv fliph | imageoptions",
        target_list: false,
        height: 300,
        resize: false,
        branding: false,
        nonbreaking_force_tab: true,
        image_title: true,
        forced_root_block: false,
        force_br_newlines: true,
        force_p_newlines: false,
        relative_urls: false,
        remove_script_host: false,
        file_picker_types: "image",
        file_picker_callback: function(cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            //input.setAttribute("accept", ".jpg,.jpeg,.png");
            input.onchange = function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    var id = "blobid" + (new Date()).getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(",")[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
            };

            input.click();
        },
        images_reuse_filename: true,
        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/static/plugin/tinymce/file_upload.php');
          
            xhr.onload = function() {
                var json;
            
                if (xhr.status != 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }
            
                json = JSON.parse(xhr.responseText);
                if (!json || typeof json.data.img != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.data.img);
            };
          
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
          
            xhr.send(formData);
        },
        language: "ko_KR",
    });
}

function textarea_maxlength(obj) {
    var maxLength = parseInt(obj.getAttribute("maxlength"));

    if (obj.value.length > maxLength) {
        alert("湲��먯닔媛� "+maxLength+"�� �대궡濡� �쒗븳�⑸땲��.");
        obj.value = obj.value.substring(0, maxLength);
    } else if ($("#letter_count").length) {
        $("#letter_count").html(obj.value.length);
    }
}

// input file �쒓렇 珥덇린�� �쒖폒二쇰뒗 �⑥닔
function file_reset(file) {
    var agent = navigator.userAgent.toLowerCase();

    if ((navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1)) {
        // ie �쇰븣 
        file.replaceWith(file.clone(true));
    } else {
        file.val("");
    }
}

function check_app() {
    var user_agent = navigator.userAgent.toLowerCase();
 
    if (user_agent.indexOf("tragin") > -1) {
        return true;
    } else {
        return false;
    }
}

function check_user_agent() {
    var user_agent = navigator.userAgent.toLowerCase();
 
    if (user_agent.indexOf("android") > -1) {
        return "android";
    } else if (user_agent.indexOf("iphone") > -1 || user_agent.indexOf("ipad") > -1 || user_agent.indexOf("ipod") > -1) {
        return "ios";
    } else {
        return "other";
    }
}