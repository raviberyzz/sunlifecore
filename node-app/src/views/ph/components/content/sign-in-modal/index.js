
            var domain='https://sv591527.ph.sunlife';
            //var domain = 'https://sv84007.ph.sunlife';
            //var path = '/Sunlife/apps/services/www/Sunlife/mobilewebapp/default/index.html';
            var path = '/Sunlife/apps/services/www/Sunlife_kyc/mobilewebapp/default/index.html';
            var key = "ff0c21aa-bb0c-498d2-aed2092-ccd0192b-ee-01-bbc0192ee";
			if(location.hostname == 'www.sunlife.com.ph'){
				domain = 'https://mobile.sunlife.com.ph';
				path = '/Sunlife/apps/services/www/Sunlife/mobilewebapp/default/index.html';
			}
            var frame;
            function validateUser() {
                $('.loading').css('display','block');
                $('#signErr').html('');
                var x = document.getElementById("form_signon");
                if(x.elements[0].value == "" || x.elements[1].value == ""){
                    $('#signErr').html(showError('Please provide username/password.'));
                } else {
                    var param = {
                        username: x.elements[0].value,
                        password: x.elements[1].value
                    };  
                    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(param), key);
                    frame = document.createElement("iframe");
                    frame.src= domain + path + "?xdm_e=true";
                    frame.style.display = "none";
                    frame.onload = function() {
                        frame.contentWindow.postMessage(String(encrypted), domain);
                    }
                    document.body.appendChild(frame);
                }
                
            }
           function showError(err){
                $('#signErr').css('display','block');
                $('.loading').css('display','none');
                return '<center><strong>'+err+'</strong></center>'
            }

           window.addEventListener('message',function(res) {
               
               if(res.origin == domain){
                if(res.data == "#/dashboard") {  
                    successLoginAnalytics();                     
                    window.open(res.origin + path + res.data, "_self");
                } else {
                    $('#signErr').html(showError(res.data));
                    frame.parentElement.removeChild(frame);
                }
               }
            })
       
