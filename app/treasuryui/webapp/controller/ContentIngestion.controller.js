
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Component"  
  ], function (Controller, MessageToast,Component) {
    "use strict";
  
    return Controller.extend("treasuryui.controller.ContentIngestion", {
      onInit: function () {
  
   
      },
      onAfterRendering: function () {
        const oIframe = this.byId("content")?.getDomRef();
        if (!oIframe) { return; }
      
        // 1. build URL first
        const sUrl = this._isFLP() ? this._getFLPUrl() : this._getStandaloneUrl();
      
        // 2. attach handler *before* setting src
        // const fnInjectCss = () => {
        //   try {
        //     const oDoc = oIframe.contentDocument || oIframe.contentWindow.document;
        //     const oStyle = oDoc.createElement("style");
        //     oStyle.textContent = `
        //       #shell-header, #shell-header-hdr, #header-shellArea { display:none!important; }
        //       #shellLayout { padding-top:0!important; }
        //     `;
        //     oDoc.head.appendChild(oStyle);
        //   } catch (e) {
        //     console.error("Failed to inject style into iframe", e);
        //   }
        // };
        // oIframe.removeEventListener("load", fnInjectCss);
        // oIframe.addEventListener("load", fnInjectCss);
      
        // 3. finally trigger navigation
       // oIframe.src = sUrl;
     //  oIframe.src = "https://core-foundational-12982zqn.workzone.cfapps.ap11.hana.ondemand.com/6eb4b4f5-b234-4432-af74-1ebc7d0dfcc7.Treasury.comscbtreasurycontentingestion-0.0.1"
        oIframe.src = sUrl;
      },
      
      _isFLP: () => !!sap.ushell?.Container,
      
      _getStandaloneUrl: function () {
        const baseUrl = window.location.href.split("#")[0];
        return baseUrl.replace(/(\/[^\/]+\.Treasury\.)[^.]+(-[\d.]+\/index\.html)/,
                               "$1comscbtreasurycontentingestion$2");
         
      },
      _getFLPUrl:function() {
      const href = window.location.href;
    
      const url = new URL(href);
      const siteId = url.searchParams.get("siteId");
      const sapAppId = url.searchParams.get("sap-ui-app-id");
      const appHint = "sap-ui-app-id-hint=saas_approuter_" + sapAppId;
    
      // Example: mapping app id to hash (like #Banks-update)
      const hashMapping = {
        peeranalysis: "Banks-update",
        uploadearnings: "Earnings-upload",
        // Add other mappings as needed
      };    
      const semanticHash = hashMapping[sapAppId] || "home";    
      const formattedUrl = `${url.origin}/site?siteId=${siteId}`;
      const completeurl = formattedUrl+"#Earnings-upload?sap-ui-app-id-hint=saas_approuter_com.scb.uploadearnings";
      return completeurl;
    }   
    });
  });
  
  