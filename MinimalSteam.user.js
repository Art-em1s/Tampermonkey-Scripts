// ==UserScript==
// @name         Minimal Steam
// @namespace    https://steamcommunity.com/profiles/76561198106192114
// @version      0.1
// @description  Modifies steam profiles to make them more minimalistic
// @author       Artemis
// @match        https://steamcommunity.com/id/*
// @match        https://steamcommunity.com/profiles/*
// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    if (document.getElementsByClassName("profile_page")[1].style.backgroundImage!=""){
        addGlobalStyle(".profile_header_badge{opacity:0;}.profile_header_bg,.profile_header_bg_texture,.profile_customization{background-image: none;}.screenshot_showcase_screenshot{border: none;}.profile_background_overlay_content{opacity:0.45;}.profile_customization{background-color: #14141400;}.playerAvatar.offline, .friend_block_holder.friend_status_offline .friend_block_avatar, .friend_activity.friend_status_offline .friend_block_avatar, .appHubIconHolder.offline, .avatar_block_status_offline, .appHubIconHolder.ignored{background: none;}.permalink {opacity: 0.5}.profile_header_content{color: #6a669a;}");
    }
})();