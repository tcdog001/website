function convertURL(url){  
      var timstamp = new Date().getTime()+"";
      if (url.indexOf("?")>=0){  
         url = url + "&t=" + timstamp;   
      }else {  
         url = url + "?t=" + timstamp;  
      };  
      location.href=url;
};