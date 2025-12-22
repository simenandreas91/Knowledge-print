function($rootScope, $scope, $window, $timeout, spUtil, $sce, spModal, $uibModal, $location, cabrillo, snAnalytics) {
    /* widget controller */
    var c = this;
    // Fallback inline logo for FFI text mark (Forsvarets forskningsinstitutt)
    var fallbackLogoSvg = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="layer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="-153 -46 652 652" style="enable-background:new -153 -46 652 652;" xml:space="preserve">
<path d="M19.5,201.2c-3.2,0-5.9,2.5-6,5.8v87c0,0,12.7,0,12.9,0c3.3-0.1,5.9-2.6,5.9-5.9v-86.7L19.5,201.2z M-113.3,217h44.9v-15.8
    h-57.5c-3.4,0-6,2.6-6.1,6V294h12.6c3.3,0,6-2.6,6-5.9v-33.5h35.8v-15.8h-29.9c-3.1,0.1-5.6,2.6-5.9,5.6L-113.3,217z M-40.6,217H4.3
    v-15.8h-57.5c-3.3,0-6,2.6-6,6V294h12.6c3.2,0,6-2.6,6-5.9v-33.5h35.7v-15.8h-29.9c-3.1,0.1-5.6,2.6-5.9,5.6V217z M64.1,205.2v11.5
    h16.1v4.1H64.1v16.9h-4.5v-36.5h21.6v4H64.1z M95.1,238.5c-7.6,0-11.5-4.4-11.5-12.3v-3.9c0-7.9,3.9-12.3,11.5-12.3
    c7.6,0,11.5,4.4,11.5,12.3v3.9C106.6,234.1,102.8,238.5,95.1,238.5z M102.2,222.2c0-5.9-2.1-8.4-7.1-8.4c-4.9,0-7.1,2.5-7.1,8.4v4
    c0,5.9,2.1,8.4,7.1,8.4s7.1-2.5,7.1-8.4V222.2z M116.5,216.2v21.5h-4.4v-27h4.4v2.1c2.5-2,5.9-2.9,9.6-2.9v3.9
    C122.5,214,118.6,215,116.5,216.2z M138.3,238.5c-3.8,0-8-0.8-8.9-1.1V234c1.6,0.1,5.5,0.6,8.8,0.6c4.6,0,5.8-1.3,5.8-3.6
    s-0.9-3.1-5.5-5.1l-2-0.9c-5.3-2.3-7.4-4.4-7.4-8.3c0-4.5,3-6.8,9.8-6.8c3.6,0,7.1,0.6,8.1,1v3.3c-2.9-0.3-6.1-0.5-8-0.5
    c-3.9,0-5.5,0.5-5.5,3c0,2.1,0.9,3,4.8,4.6l2,0.9c6.3,2.8,8.1,4.5,8.1,8.6C148.3,234.9,146.3,238.5,138.3,238.5z M166.3,237.7h-6.1
    l-9-27h4.8l5.1,16.6c0.9,2.6,1.5,5,2.3,7.4c0.6-2.5,1.3-4.8,2.1-7.4l5.1-16.6h4.8L166.3,237.7z M194.3,237.7v-1.9
    c-1.6,1.1-4.6,2.5-8.6,2.5c-5.1,0-8-2.3-8-7.6v-1c0-7.1,4.9-8.4,12.4-8.4h4v-2c0-4.6-0.9-5.8-6.4-5.8c-3,0-5.4,0.3-8.4,0.6v-3
    c0.8-0.3,4.5-1.1,8.8-1.1c9,0,10.4,3.3,10.4,9.5v18.3h-4.1V237.7z M194.1,224.7h-4c-5.8,0-8,0.8-8,5v1.4c0,3,1.9,3.9,4.5,3.9
    c3.3,0,6.4-1.4,7.5-2.1V224.7z M209.9,216.2v21.5h-4.4v-27h4.4v2.1c2.5-2,5.9-2.9,9.6-2.9v3.9C215.9,214,211.9,215,209.9,216.2z
     M226.4,225.9v0.5c0,4.6,0.6,8.3,8.1,8.3c3,0,6.9-0.4,9.4-0.8v3.5c-1.9,0.5-5.1,1.1-9.6,1.1c-9.6,0-12.4-4.3-12.4-13v-2.1
    c0-8.5,3.8-13.4,11.5-13.4c8,0,11.6,4.8,11.6,13.9v2H226.4L226.4,225.9z M240.4,221.7c0-3.3-0.6-7.9-7-7.9c-6.3,0-7,4.6-7,7.9v0.5
    h14V221.7L240.4,221.7z M259.8,238.5c-4.9,0-6.6-1.8-6.6-6.9v-17.3l-5.5-0.4v-3.3h5.5v-7h4.4v7h7.3v3.6h-7.3v17c0,3,0.3,3.5,2.8,3.5
    c1.5,0,3.6-0.1,4.5-0.3v3C264,238,261.9,238.5,259.8,238.5z M277.6,238.5c-3.8,0-8-0.8-8.9-1.1V234c1.6,0.1,5.5,0.6,8.8,0.6
    c4.6,0,5.8-1.3,5.8-3.6s-0.9-3.1-5.5-5.1l-2-0.9c-5.3-2.3-7.4-4.4-7.4-8.3c0-4.5,3-6.8,9.8-6.8c3.6,0,7.1,0.6,8.1,1v3.3
    c-2.9-0.3-6.1-0.5-8-0.5c-3.9,0-5.5,0.5-5.5,3c0,2.1,0.9,3,4.8,4.6l2,0.9c6.3,2.8,8.1,4.5,8.1,8.6
    C287.8,234.9,285.6,238.5,277.6,238.5z M66,270.5v23.4h-4.4v-23.4l-5.1-0.4v-3.3h5.1v-3.3c0-4.1,0.6-8.4,7-8.4c2.1,0,4,0.4,5.3,0.8
    v3c-1.1,0-3-0.3-4.6-0.3c-3,0-3.1,1.5-3.1,4.9v3.3h7.6v3.6H66L66,270.5z M87.1,294.5c-7.6,0-11.5-4.4-11.5-12.2v-3.9
    c0-7.9,3.9-12.3,11.5-12.3c7.6,0,11.5,4.4,11.5,12.3v3.9C98.6,290.1,94.7,294.5,87.1,294.5z M94.3,278.4c0-5.9-2.1-8.4-7.1-8.4
    c-4.9,0-7.1,2.5-7.1,8.4v3.9c0,5.9,2.1,8.4,7.1,8.4s7.1-2.5,7.1-8.4V278.4z M108.5,272.4v21.5h-4.4v-27h4.4v2.1
    c2.5-2,5.9-2.9,9.6-2.9v3.9C114.5,270.1,110.5,271,108.5,272.4z M130.3,294.5c-3.8,0-8-0.8-8.9-1.1V290c1.6,0.1,5.5,0.8,8.8,0.8
    c4.6,0,5.8-1.3,5.8-3.6c0-2.4-0.9-3.1-5.5-5.1l-2-0.9c-5.2-2.3-7.4-4.4-7.4-8.3c0-4.5,3-6.8,9.8-6.8c3.6,0,7.1,0.6,8.1,1v3.3
    c-2.9-0.3-6.1-0.5-8-0.5c-3.9,0-5.5,0.5-5.5,3c0,2.1,0.9,3,4.8,4.6l2,0.9c6.3,2.8,8.1,4.5,8.1,8.6
    C140.3,290.9,138.3,294.5,130.3,294.5z M161.1,293.9l-11-13.5v13.5h-4.4v-38.1h4.4V279l10.9-12.1h5.8L155,279.6l12,14.3H161.1z
     M188.6,293.9v-17.3c0-4.9-0.8-6.6-4.5-6.6c-2.1,0-4.9,0.9-8.5,2.4v21.5h-4.4v-27h4.4v2.1c3.1-1.6,6-2.8,9-2.8
    c7.1,0,8.5,3.9,8.5,10.5V294h-4.5V293.9z M200.6,255.7h4.5v6h-4.5V255.7z M200.6,266.9h4.4v27h-4.4V266.9z M230,293.9v-17.3
    c0-4.9-0.8-6.6-4.5-6.6c-2.1,0-4.9,0.9-8.5,2.4v21.5h-4.4v-27h4.4v2.1c3.1-1.6,6-2.8,9-2.8c7.1,0,8.5,3.9,8.5,10.5V294H230V293.9z
     M252.1,304.9c-4.1,0-9.1-0.7-9.9-1v-3.3c3,0.3,6.5,0.4,9.9,0.4c5.4,0,6-1.9,6-5.6V294c-0.9,0.1-3.5,0.5-5.5,0.5
    c-7.6,0-12-3-12-12.5v-3.4c0-8.3,3.5-12.5,12.3-12.5c3.3,0,7,0.4,9.8,0.8v28.5C262.5,300.9,260.8,304.9,252.1,304.9z M258.1,270.2
    c-0.5-0.1-2.9-0.4-5.3-0.4c-6.1,0-7.7,2.9-7.7,8.8v3.4c0,6.8,2.1,8.8,7.6,8.8c2,0,4.8-0.3,5.4-0.5V270.2L258.1,270.2z M276.9,294.5
    c-3.8,0-8-0.8-8.9-1.1V290c1.6,0.1,5.5,0.8,8.8,0.8c4.6,0,5.8-1.3,5.8-3.6c0-2.4-0.9-3.1-5.5-5.1l-2-0.9c-5.3-2.3-7.4-4.4-7.4-8.3
    c0-4.5,3-6.8,9.8-6.8c3.6,0,7.1,0.6,8.1,1v3.3c-2.9-0.3-6.1-0.5-8-0.5c-3.9,0-5.5,0.5-5.5,3c0,2.1,0.9,3,4.8,4.6l2,0.9
    c6.3,2.8,8.1,4.5,8.1,8.6C287,290.9,284.9,294.5,276.9,294.5z M292.8,255.7h4.5v6h-4.5V255.7z M292.8,266.9h4.4v27h-4.4V266.9z
     M322.3,293.9v-17.3c0-4.9-0.8-6.6-4.5-6.6c-2.1,0-4.9,0.9-8.5,2.4v21.5h-4.4v-27h4.4v2.1c3.1-1.6,6-2.8,9-2.8
    c7.1,0,8.5,3.9,8.5,10.5V294h-4.5V293.9z M341,294.5c-3.8,0-8-0.8-8.9-1.1V290c1.6,0.1,5.5,0.8,8.8,0.8c4.6,0,5.8-1.3,5.8-3.6
    c0-2.4-0.9-3.1-5.5-5.1l-2-0.9c-5.3-2.3-7.4-4.4-7.4-8.3c0-4.5,3-6.8,9.8-6.8c3.6,0,7.1,0.6,8.1,1v3.3c-2.9-0.3-6.1-0.5-8-0.5
    c-3.9,0-5.5,0.5-5.5,3c0,2.1,0.9,3,4.8,4.6l2,0.9c6.3,2.8,8.1,4.5,8.1,8.6C351,290.9,349,294.5,341,294.5z M366.1,294.5
    c-4.9,0-6.6-1.8-6.6-6.9v-17.1l-5.5-0.4v-3.3h5.5v-7h4.4v7h7.3v3.6h-7.3v17c0,3,0.3,3.5,2.8,3.5c1.5,0,3.6-0.1,4.5-0.3v3
    C370.4,294,368.1,294.5,366.1,294.5z M376.4,255.7h4.5v6h-4.5V255.7z M376.4,266.9h4.4v27h-4.4V266.9z M398,294.5
    c-4.9,0-6.6-1.8-6.6-6.9v-17.1l-5.5-0.4v-3.3h5.5v-7h4.4v7h7.3v3.6h-7.3v17c0,3,0.3,3.5,2.8,3.5c1.5,0,3.6-0.1,4.5-0.3v3
    C402.3,294,400.1,294.5,398,294.5z M425.3,293.9v-2.1c-3.6,1.9-6.6,2.8-9.4,2.8c-6.6,0-8-4.6-8-10.5v-17.1h4.4v17.3
    c0,4.9,0.8,6.6,4.6,6.6c2.1,0,4.9-0.9,8.5-2.4v-21.5h4.4v27H425.3z M462,270.5h6v-3.6h-6h-1.3v-7h-4.4v7h-12v-7H440v7h-5.5v3.3
    l5.5,0.4v17.1c0,5.1,1.8,6.9,6.6,6.9c2.1,0,4.3-0.5,5-0.8v-3c-0.9,0.1-3,0.3-4.5,0.3c-2.5,0-2.8-0.5-2.8-3.5v-17h12v17.1
    c0,5.1,1.8,6.9,6.6,6.9c2.1,0,4.3-0.5,5-0.8v-3c-0.9,0.1-3,0.3-4.5,0.3c-2.5,0-2.8-0.5-2.8-3.5v-17H462z M-120.1,342.4l-7.6-15.5
    c-0.5-1.1-1.3-2.4-1.8-3.6c0,1.4,0,3,0,4.5v14.8h-2.5v-21.8h3.9l7.5,15.1c0.5,1,1.3,2.5,1.8,3.8c-0.1-1.7-0.1-3.4-0.1-4.8v-14.1h2.6
    v21.6H-120.1L-120.1,342.4z M-105.6,342.9c-4.5,0-6.9-2.6-6.9-7.3v-2.4c0-4.6,2.4-7.2,6.9-7.2s6.9,2.6,6.9,7.2v2.4
    C-98.8,340.2-101.1,342.9-105.6,342.9z M-101.4,333.2c0-3.5-1.3-5-4.3-5c-2.9,0-4.3,1.5-4.3,5v2.4c0,3.5,1.3,5,4.3,5s4.3-1.5,4.3-5
    V333.2z M-92.4,329.6v12.8H-95v-16h2.6v1.3c1.5-1.3,3.5-1.8,5.8-1.8v2.4C-88.8,328.2-91.1,328.9-92.4,329.6z M-65.5,342.4h-3.8
    l-3-9.6c-0.5-1.5-0.8-2.5-0.9-3.3h-0.1c-0.1,0.8-0.4,1.8-0.9,3.3l-3,9.6h-3.8l-3.6-16h2.6l2.4,9.9c0.3,1.4,0.5,2.8,0.6,4.1h0.1
    c0.4-1.4,0.8-2.9,1.1-4.1l2.6-8.6h3.8l2.6,8.6c0.4,1.3,0.8,2.6,1.1,4.1h0.1c0.1-1.4,0.4-2.8,0.6-4.1l2.1-9.9h2.6L-65.5,342.4z
     M-57,335.4v0.4c0,2.8,0.4,4.9,4.9,4.9c1.8,0,4.1-0.2,5.6-0.5v2.1c-1.1,0.2-3.1,0.6-5.8,0.6c-5.6,0-7.4-2.5-7.4-7.8v-1.3
    c0-5,2.3-7.9,6.8-7.9c4.8,0,6.9,2.9,6.9,8.2v1.1H-57z M-48.6,332.9c0-2-0.4-4.6-4.1-4.6c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.2V332.9z
     M-35.8,348.9c-2.5,0-5.4-0.5-5.9-0.6v-1.9c1.7,0.1,3.9,0.3,5.9,0.3c3.1,0,3.5-1.1,3.5-3.4v-0.8c-0.5,0.1-2,0.3-3.3,0.3
    c-4.5,0-7.1-1.7-7.1-7.4v-2c0-4.9,2.1-7.4,7.3-7.4c1.9,0,4.1,0.2,5.7,0.4v17C-29.6,346.6-30.6,348.9-35.8,348.9z M-32.2,328.4
    c-0.4,0-1.8-0.3-3.1-0.3c-3.6,0-4.6,1.8-4.6,5.3v2c0,4,1.3,5.2,4.5,5.2c1.3,0,2.8-0.1,3.3-0.2V328.4L-32.2,328.4z M-25.2,319.9h2.6
    v3.5h-2.6V319.9z M-25.2,326.4h2.6v16h-2.6V326.4z M-9.1,342.4v-1.1c-1,0.6-2.8,1.5-5.1,1.5c-3,0-4.7-1.4-4.7-4.5v-0.6
    c0-4.3,2.9-5,7.4-5h2.4v-1.1c0-2.8-0.5-3.4-3.8-3.4c-1.7,0-3.2,0.1-5,0.4v-1.9c0.5-0.1,2.6-0.8,5.1-0.8c5.4,0,6.1,2,6.1,5.6v10.9
    H-9.1z M-9.3,334.7h-2.4c-3.4,0-4.8,0.4-4.8,3v0.8c0,1.7,1.1,2.2,2.6,2.2c1.9,0,3.8-0.9,4.5-1.3V334.7L-9.3,334.7z M7.9,342.4v-10.3
    c0-2.9-0.5-4-2.6-4c-1.3,0-2.9,0.5-5,1.4v12.8h-2.6v-16h2.6v1.3c1.9-1,3.5-1.6,5.4-1.6c4.3,0,5,2.3,5,6.3v10.3H7.9z M30,342.4h-6.1
    v-21.6H30c6.7,0,9.5,3.5,9.5,9v3.5C39.5,338.9,37,342.4,30,342.4z M36.8,329.7c0-4.9-2.4-6.6-7-6.6h-3.1V340h3.1c4.6,0,7-1.8,7-6.8
    V329.7z M45.4,335.4v0.4c0,2.8,0.4,4.9,4.9,4.9c1.7,0,4.1-0.2,5.6-0.5v2.1c-1.1,0.2-3,0.6-5.8,0.6c-5.6,0-7.4-2.5-7.4-7.8v-1.3
    c0-5,2.3-7.9,6.7-7.9c4.8,0,6.9,2.9,6.9,8.2v1.1H45.4z M53.8,332.9c0-2-0.4-4.6-4.1-4.6c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.3V332.9
    L53.8,332.9z M64.3,328.5v13.9h-2.6v-13.9l-3-0.3v-2h3v-1.9c0-2.5,0.4-5,4.1-5c1.3,0,2.4,0.3,3.1,0.4v1.7c-0.7,0-1.8-0.1-2.8-0.1
    c-1.7,0-1.9,0.9-1.9,2.9v1.9h4.5v2.3h-4.5V328.5z M73.9,335.4v0.4c0,2.8,0.4,4.9,4.9,4.9c1.7,0,4.1-0.2,5.6-0.5v2.1
    c-1.1,0.2-3.1,0.6-5.8,0.6c-5.8,0-7.4-2.5-7.4-7.8v-1.3c0-5,2.2-7.9,6.7-7.9c4.8,0,6.9,2.9,6.9,8.2v1.1H73.9z M82.1,332.9
    c0-2-0.4-4.6-4.1-4.6c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.3V332.9L82.1,332.9z M98.9,342.4v-10.3c0-2.9-0.5-4-2.6-4c-1.3,0-2.9,0.5-5,1.4
    v12.8h-2.6v-16h2.6v1.3c1.9-1,3.5-1.6,5.4-1.6c4.3,0,5,2.3,5,6.3v10.3H98.9z M111.6,342.9c-4.4,0-6.4-2.6-6.4-7.3v-2.4
    c0-4.6,2-7.2,6.4-7.2c2.4,0,4,0.4,4.6,0.5v2c-2-0.3-3.4-0.3-4.3-0.3c-2.6,0-4.1,1-4.1,5v2.4c0,4,1.6,5,4.1,5c0.9,0,2.3-0.1,4.3-0.2
    v2C115.8,342.5,114,342.9,111.6,342.9z M121.6,335.4v0.4c0,2.8,0.4,4.9,4.9,4.9c1.8,0,4.1-0.2,5.6-0.5v2.1c-1.1,0.2-3.1,0.6-5.8,0.6
    c-5.7,0-7.4-2.5-7.4-7.8v-1.3c0-5,2.3-7.9,6.8-7.9c4.8,0,6.9,2.9,6.9,8.2v1.1H121.6z M129.9,332.9c0-2-0.4-4.6-4.1-4.6
    c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.3V332.9L129.9,332.9z M157.8,342.4l-5.1-8.5c-0.6,0-1.4,0-2,0h-2.5v8.4h-2.6v-21.5h5.1c5,0,9,1,9,6.6
    c0,3.5-1.5,5.1-4,6l5.4,9H157.8L157.8,342.4z M150.6,323.1h-2.4v8.5h2.5c4.3,0,6.3-0.9,6.3-4.3C156.9,323.7,154.8,323.1,150.6,323.1
    z M165.4,335.4v0.4c0,2.8,0.4,4.9,4.9,4.9c1.8,0,4.1-0.2,5.6-0.5v2.1c-1.1,0.2-3.1,0.6-5.8,0.6c-5.8,0-7.4-2.5-7.4-7.8v-1.3
    c0-5,2.3-7.9,6.8-7.9c4.8,0,6.9,2.9,6.9,8.2v1.1H165.4z M173.8,332.9c0-2-0.4-4.6-4.1-4.6c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.4v-0.2
    H173.8z M184.9,342.9c-2.3,0-4.8-0.5-5.3-0.6v-2c1,0.1,3.3,0.4,5.1,0.4c2.8,0,3.5-0.8,3.5-2.1c0-1.4-0.5-1.9-3.3-3l-1.1-0.5
    c-3.1-1.4-4.4-2.6-4.4-4.9c0-2.8,1.8-4,5.8-4c2.1,0,4.3,0.4,4.9,0.6v2c-1.8-0.1-3.6-0.2-4.8-0.2c-2.4,0-3.3,0.2-3.3,1.7
    c0,1.3,0.5,1.8,2.8,2.8l1.1,0.5c3.8,1.6,4.9,2.6,4.9,5.1C190.9,340.6,189.6,342.9,184.9,342.9z M196.5,335.4v0.4
    c0,2.8,0.4,4.9,4.9,4.9c1.7,0,4.1-0.2,5.6-0.5v2.1c-1.1,0.2-3.1,0.6-5.8,0.6c-5.8,0-7.4-2.5-7.4-7.8v-1.3c0-5,2.2-7.9,6.7-7.9
    c4.8,0,6.9,2.9,6.9,8.2v1.1H196.5z M204.8,332.9c0-2-0.4-4.6-4.1-4.6c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.3V332.9z M220.5,342.4v-1.1
    c-1,0.6-2.8,1.5-5.1,1.5c-3,0-4.8-1.4-4.8-4.5v-0.6c0-4.3,2.9-5,7.4-5h2.4v-1.1c0-2.8-0.5-3.4-3.8-3.4c-1.8,0-3.3,0.1-5,0.4v-1.9
    c0.5-0.1,2.6-0.8,5.1-0.8c5.4,0,6.1,2,6.1,5.6v10.9H220.5z M220.4,334.7H218c-3.4,0-4.7,0.4-4.7,3v0.8c0,1.7,1.1,2.2,2.6,2.2
    c1.9,0,3.8-0.9,4.5-1.3V334.7L220.4,334.7z M229.8,329.6v12.8h-2.6v-16h2.6v1.3c1.5-1.3,3.5-1.8,5.8-1.8v2.4
    C233.4,328.2,231,328.9,229.8,329.6z M244.1,342.9c-4.4,0-6.4-2.6-6.4-7.3v-2.4c0-4.6,2-7.2,6.4-7.2c2.4,0,4,0.4,4.6,0.5v2
    c-2-0.3-3.4-0.3-4.2-0.3c-2.6,0-4.1,1-4.1,5v2.4c0,4,1.6,5,4.1,5c0.9,0,2.2-0.1,4.2-0.2v2C248.1,342.5,246.4,342.9,244.1,342.9z
     M262.4,342.4v-10.1c0-3.1-0.9-4-3-4c-1.9,0-3.6,0.6-4.8,1.1v13H252v-22.5h2.6v7.4c1-0.5,2.9-1.3,5.3-1.3c3.5,0,5.1,2,5.1,6.3v10.2
    h-2.6V342.4z M278.5,342.4v-21.6h12.8v2.4h-10.1v6.9h9.6v2.4h-9.6v7.6h10.1v2.4H278.5z M299.9,342.9c-2.3,0-4.8-0.5-5.3-0.6v-2
    c1,0.1,3.3,0.4,5.1,0.4c2.8,0,3.5-0.8,3.5-2.1c0-1.4-0.5-1.9-3.3-3l-1.1-0.5c-3.1-1.4-4.4-2.6-4.4-4.9c0-2.8,1.8-4,5.8-4
    c2.1,0,4.3,0.4,4.9,0.6v2c-1.8-0.1-3.6-0.2-4.8-0.2c-2.4,0-3.3,0.2-3.3,1.7c0,1.3,0.5,1.8,2.8,2.8l1.1,0.5c3.8,1.6,4.9,2.6,4.9,5.1
    C305.8,340.6,304.6,342.9,299.9,342.9z M315.3,342.9c-2.9,0-4-1-4-4.1v-10.1l-3.3-0.3v-2h3.3v-4.1h2.6v4.1h4.3v2.3h-4.3v10.1
    c0,1.8,0.1,2.1,1.6,2.1c0.9,0,2.1-0.1,2.6-0.1v1.8C317.8,342.5,316.5,342.9,315.3,342.9z M330.8,342.4v-1.1c-1,0.6-2.8,1.5-5.1,1.5
    c-3,0-4.8-1.4-4.8-4.5v-0.6c0-4.3,2.9-5,7.4-5h2.4v-1.1c0-2.8-0.5-3.4-3.8-3.4c-1.8,0-3.3,0.1-5,0.4v-1.9c0.5-0.1,2.6-0.8,5.1-0.8
    c5.4,0,6.1,2,6.1,5.6v10.9H330.8z M330.6,334.7h-2.4c-3.4,0-4.8,0.4-4.8,3v0.8c0,1.7,1.1,2.2,2.6,2.2c1.9,0,3.8-0.9,4.5-1.3V334.7
    L330.6,334.7z M343.4,342.9c-2,0-3.3-0.1-5.9-0.4v-22.6h2.6v7.1c1.4-0.8,3-1.1,4.3-1.1c4.1,0,6.1,2.3,6.1,6.9v2.8
    C350.5,340.6,348.1,342.9,343.4,342.9z M347.9,332.7c0-3.3-1-4.5-3.8-4.5c-0.9,0-2.8,0.1-4,0.9v11.3c0.8,0,1.9,0.1,3.4,0.1
    c3,0,4.4-1.3,4.4-5V332.7z M357,319.9h-2.6v22.6h2.6V319.9z M361.5,319.9h2.6v3.5h-2.6V319.9z M361.5,326.4h2.6v16h-2.6V326.4z
     M373.1,342.9c-2.3,0-4.8-0.5-5.3-0.6v-2c1,0.1,3.3,0.4,5.1,0.4c2.8,0,3.5-0.8,3.5-2.1c0-1.4-0.5-1.9-3.3-3l-1.1-0.5
    c-3.1-1.4-4.4-2.6-4.4-4.9c0-2.8,1.8-4,5.8-4c2.1,0,4.3,0.4,4.9,0.6v2c-1.8-0.1-3.6-0.2-4.8-0.2c-2.4,0-3.3,0.2-3.3,1.7
    c0,1.3,0.5,1.8,2.8,2.8l1.1,0.5c3.8,1.6,4.9,2.6,4.9,5.1C379,340.6,377.9,342.9,373.1,342.9z M392.8,342.4v-10.1c0-3.1-0.8-4-3-4
    c-1.9,0-3.6,0.6-4.8,1.1v13h-2.6v-22.5h2.6v7.4c1-0.5,2.9-1.3,5.3-1.3c3.5,0,5.1,2,5.1,6.3v10.2h-2.6V342.4z M417.5,342.4v-10.6
    c0-2.3,0-3.5-2.4-3.5c-1.1,0-2.6,0.5-4,1.4c0.1,0.8,0.1,1.5,0.1,2.3v10.6h-2.6v-10.6c0-2.3,0-3.5-2.3-3.5c-1.4,0-3,0.8-4.1,1.4v12.7
    h-2.6v-16h2.6v1.3c1.3-1,3-1.6,4.8-1.6c1.9,0,2.9,0.6,3.5,1.8c1.9-1.3,3.5-1.8,5-1.8c4.6,0,4.6,3.4,4.6,5.8v10.6h-2.6V342.4z
     M426.5,335.4v0.4c0,2.8,0.4,4.9,4.9,4.9c1.8,0,4.1-0.2,5.6-0.5v2.1c-1.1,0.2-3.1,0.6-5.8,0.6c-5.8,0-7.4-2.5-7.4-7.8v-1.3
    c0-5,2.3-7.9,6.8-7.9c4.8,0,6.9,2.9,6.9,8.2v1.1H426.5z M434.9,332.9c0-2-0.4-4.6-4.1-4.6c-3.6,0-4.1,2.8-4.1,4.6v0.2h8.4v-0.2
    H434.9z M451.5,342.4v-10.3c0-2.9-0.5-4-2.8-4c-1.3,0-2.9,0.5-5,1.4v12.8h-2.6v-16h2.6v1.3c1.9-1,3.5-1.6,5.4-1.6c4.3,0,5,2.3,5,6.3
    v10.3H451.5z M464.4,342.9c-2.9,0-4-1-4-4.1v-10.1l-3.3-0.3v-2h3.3v-4.1h2.6v4.1h4.3v2.3H463v10.1c0,1.8,0.1,2.1,1.6,2.1
    c0.9,0,2.1-0.1,2.6-0.1v1.8C466.9,342.5,465.5,342.9,464.4,342.9z"/>
</svg>`;
    var fallbackLogoUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(fallbackLogoSvg);
    c.logoFallbackSvg = fallbackLogoSvg;
    c.logoFallbackUrl = fallbackLogoUrl;
    if (c.data.redirect) {
        var id = $location.search().sys_kb_id ? 'sys_kb_id' : 'sys_id';
        if ($location.search()[id] && $location.search()[id] !== c.data.redirect) {
            $location.state({
                addSPA: true
            });
            $location.search('spa', 1);
            $location.search(id, c.data.redirect);
            $location.replace();
        }
    }

    c.printArticle = function(myID) {
        // Keep a copy of the current DOM so we can restore it later
        var originalHTML = document.body.innerHTML;

        // Grab the current article HTML
        var articleElement = document.getElementById(myID);
        if (!articleElement) {
            // Fallback: if the element id is wrong, just do a normal print
            window.print();
            return;
        }

        var escapeHtml = function(value) {
            if (value === undefined || value === null)
                return '';
            return String(value).replace(/[&<>"']/g, function(char) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[char];
            });
        };

        var articleHTML = articleElement.innerHTML;
        var policyDetails = c.data.policyInfo || {};
        var policyNumber = escapeHtml(policyDetails.number || '');
        var policyType = escapeHtml(policyDetails.type || '');
        var policyName = escapeHtml(policyDetails.name || '');
        var policyCategory = escapeHtml(policyDetails.policy_category || '');
        var policyGradingLevel = escapeHtml(policyDetails.grading_level || '');
        var policyGradingLabel = escapeHtml(policyDetails.grading_label || policyDetails.grading_level || '');
        var policyGradingDescription = escapeHtml(policyDetails.grading_description || '');
        var policyGradingColor = escapeHtml(policyDetails.grading_color || '#003366');
        var policyValidFromRaw = policyDetails.valid_from || '';
        var formatDateOnly = function(val) {
            if (!val)
                return '';
            var match = String(val).match(/^\s*(\d{4})-(\d{2})-(\d{2})/);
            return match ? (match[3] + '.' + match[2] + '.' + match[1]) : val;
        };
        var policyValidFrom = escapeHtml(formatDateOnly(policyValidFromRaw));
        var policyApprovers = escapeHtml(policyDetails.approvers || '');
        var policyOwner = escapeHtml(policyDetails.owner || '');
        var policyState = escapeHtml(policyDetails.state || '');
        var policyArticleVersion = escapeHtml(policyDetails.article_version || '');

        // Inline logo using KB base icon when available; fall back to embedded SVG
        var logoSrc = c.data.logoDataUrl || fallbackLogoUrl;
        var logoMarkup =
            '<div style="display:flex; justify-content:center; align-items:center; width:100%; padding:8px 6px;">' +
                '<img src="' + logoSrc + '" alt="FFI logo" style="max-width:100%; height:auto; display:block;" />' +
            '</div>';

        var metadataHeaderHTML =
            '<style>@media print { .km-print-color { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; } }</style>' +
            '<div class="km-print-color" style="font-family: Arial, sans-serif; font-size: 11px; color:#000; padding: 0 4px; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">' +
            '<table style="width: 100%; border-collapse: collapse; border: 1px solid #000; font-size: 11px; box-sizing: border-box;">' +
            '<tr style="height: 60px;">' +
            '<td style="width: 18%; min-width: 150px; border: 1px solid #000; text-align: center; vertical-align: middle; padding: 8px 8px; box-sizing: border-box;">' +
            logoMarkup +
            '</td>' +
            '<td colspan="3" style="border: 1px solid #000; text-align: center; padding: 5px 10px; box-sizing: border-box;">' +
            '<div style="font-size: 11px; margin-bottom: 2px;">' + (policyType || '&nbsp;') + '</div>' +
            '<div style="font-size: 18px; font-weight: bold; margin-bottom: 2px; color:#003366;">' + (policyName || '&nbsp;') + '</div>' +
            '<div style="font-size: 11px;">' + (policyCategory || '&nbsp;') + '</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px; box-sizing: border-box;">' +
            '<div><strong>Dokument-ID:</strong> ' + (policyNumber || 'N/A') + '</div>' +
            '<div><strong>Versjon:</strong> ' + (policyArticleVersion || 'N/A') + '</div>' +
            '<div><strong>Status:</strong> ' + (policyState || 'N/A') + '</div>' +
            '</td>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px; box-sizing: border-box;">' +
            '<div><strong>Dokumentansvarlig:</strong> ' + (policyOwner || 'N/A') + '</div>' +
            '</td>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px; box-sizing: border-box;">' +
            '<div><strong>Godkjent av:</strong> ' + (policyApprovers || 'N/A') + '</div>' +
            '</td>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px; width: 18%; box-sizing: border-box;">' +
            '<div><strong>Godkjent fra:</strong> ' + (policyValidFrom || 'N/A') + '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '<div style="display: flex; justify-content: flex-end; color:' + (policyGradingColor || '#003366') + '; font-size: 11px; margin: 6px 4px 12px 4px; -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">' +
            '<div style="text-align: right; line-height: 1.2; color:' + (policyGradingColor || '#003366') + '; -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">' +
            '<div style="font-weight: 700; text-transform: uppercase;">' + (policyGradingLabel || '&nbsp;') + '</div>' +
            (policyGradingDescription ? '<div style="margin-top: 2px;">' + policyGradingDescription + '</div>' : '') +
            '</div>' +
            '</div>' +
            '</div>';

        // Build the printable document: metadata header + article content
        document.body.innerHTML = metadataHeaderHTML + articleHTML;

        // Remove elements you don’t want in the PDF
        document.querySelectorAll('.title-secondary-data, .transparent-button')
            .forEach(function(el) {
                el.parentNode && el.parentNode.removeChild(el);
            });

        // Wait for images (logo/attachments) to load before printing
        var printed = false;
        var restoreAndReload = function() {
            if (printed)
                return;
            printed = true;
            window.print();
            document.body.innerHTML = originalHTML;
            window.location.reload();
        };

        var imgs = Array.prototype.slice.call(document.querySelectorAll('img'));
        if (imgs.length === 0) {
            restoreAndReload();
        } else {
            var remaining = imgs.length;
            var done = function() {
                remaining--;
                if (remaining <= 0)
                    restoreAndReload();
            };
            imgs.forEach(function(img) {
                if (img.complete && img.naturalWidth !== 0) {
                    done();
                } else {
                    img.onload = done;
                    img.onerror = done;
                }
            });
            // Fallback: ensure print still happens even if an image never finishes
            $timeout(restoreAndReload, 500);
        }
    };


    if (c.data.replacementArticleId) {
        var queryParameters = $location.search();
        var articleIdentifier = queryParameters.hasOwnProperty('sys_kb_id') ? 'sys_kb_id' : queryParameters.hasOwnProperty('sysparm_article') ? 'sysparm_article' : 'sys_id';

        if (queryParameters[articleIdentifier] !== c.data.replacementArticleId) {
            $location.state({
                addSPA: true
            });
            $location.search('spa', 1);
            $location.search(articleIdentifier, c.data.replacementArticleId);
            $location.replace();
        }

        if (c.data.page_title && c.data.page_title != $window.document.title) {
            $window.document.title = c.data.page_title;
        }
    }

    $window.onpopstate = function(e) {
        if (e && e.state && e.state.addSPA) {
            $location.search('spa', null);
            $location.replace();
        }
    };

    if (c.data.isValid) {
        if (c.data.kbContentData && c.data.kbContentData.isTemplate) {
            //alert(c.data.kbContentData.data);
            c.data.kbContentData.data.forEach(function(field) {
                if (field.type == 'html')
                    field.content = $sce.trustAsHtml(field.content);
                //alert(field.content);

            });

            if (c.data.articleType === 'wiki') {
                c.data.kbWiki = $sce.trustAsHtml(c.data.kbWiki);
                //alert(c.data.kbWiki);
            }
        } else if (c.data.articleType === 'wiki') {
            c.data.kbWiki = $sce.trustAsHtml(c.data.kbWiki);
            //alert(c.data.kbWiki);
        } else {
            c.data.kbContentData.data = $sce.trustAsHtml(c.data.kbContentData.data);
            c.data.wordCount = c.data.kbContentData.data.toString().replace(/(<([^>]+)>)/ig, '').split(' ').length;
        }
    }

    $scope.submitted = false;
    c.flagMessage = null;
    $timeout(function() {
        $rootScope.$broadcast("sp.update.breadcrumbs", $scope.data.breadCrumb);
    });
    $rootScope.properties = $scope.data.properties;
    $rootScope.messages = $scope.data.messages;
    $rootScope.isValid = c.data.isValid;
    $rootScope.isKBAdmin = $scope.data.isKBAdmin;
    $rootScope.isKBOwner = $scope.data.isKBOwner;
    $rootScope.article_sys_id = $scope.data.article_sys_id;
    $rootScope.attachments = $scope.data.attachments;
    $rootScope.attachedIncidents = $scope.data.attachedIncidents;
    $rootScope.affectedProducts = $scope.data.affectedProducts;
    $rootScope.displayAttachments = $scope.data.displayAttachments;
    $rootScope.hideFeedbackOptions = $scope.data.hideFeedbackOptions;
    $rootScope.helpfulContent = $scope.data.helpfulContent;
    $rootScope.tableName = $scope.data.tableName;
    $rootScope.hasComments = $scope.data.hasComments;
    $scope.data.isSubscribed = $scope.data.isArticleSubscribed || $scope.data.isArticleSubscribedAtKB;
    $scope.data.subscribeLabel = ($scope.data.isSubscribed ? $scope.data.messages.SUBSCRIBED : $scope.data.messages.SUBSCRIBE);
    c.createIncidentURL = c.options.create_task_url || ($scope.data.properties && $scope.data.properties.createIncidentURL);
    c.createIncidentLabel = c.options.create_task_prompt || $scope.data.messages.CREATE_INCIDENT;
    c.showCreateIncident = c.data.isLoggedInUser && c.options.show_create_incident_action != 'false' && c.data.properties && c.data.properties.showKBCreateIncident && c.createIncidentURL;
    c.showFlagArticle = c.data.properties && c.data.properties.showKBFlagArticle && c.data.properties.showRatingOptions;
    c.showMenu = c.data.properties && (c.showFlagArticle || c.data.properties.isEditable || c.showCreateIncident);
    $rootScope.stackUrl = window.location.pathname + '?id=' + c.data.params.sysparm_article_view_page_id + '%26' + (c.data.params.sysparm_article ? 'sysparm_article=' + c.data.params.sysparm_article : 'sys_kb_id=' + c.data.params.sys_kb_id);
    c.stackUrl = $rootScope.stackUrl;
    c.flagMessage = '';
    c.task = {};
    c.imageInstance = '';
    $scope.data.toggleSubscribed = ($scope.data.isSubscribed ? true : false);
    c.reasons = c.data.feedback_reasons;
    c.data.reason = '4';
    c.imageInstance = '';
    c.minImageHeight = parseInt(c.options.min_image_height) || 100;
    c.minImageWidth = parseInt(c.options.min_image_width) || 185;
    c.readOnly = false;
    c.isMobile = spUtil.isMobile() || cabrillo.isNative();
    c.isAgentApp = navigator.userAgent.indexOf('Agent') > -1;
    c.editUrl = c.data.wordOnlineUrl || 'kb_knowledge.do?sys_id=' + c.data.article_sys_id + '&sysparm_stack=' + c.stackUrl;

    //Use KB specific stylic for all portals unless rating style is set
    c.KBRatingStyle = c.options.kb_rating_style;

    if (c.data.langList && c.data.langList.length > 1) {
        for (var lng in c.data.langList) {
            if (c.data.langList[lng].selected == true) {
                c.selectedLanguage = c.data.langList[lng];
                break;
            }
        }
    }

    var payload = {};
    payload.name = "View Knowledge Article";
    payload.data = {};
    payload.data["Article Title"] = c.data.shortDesc;
    payload.data["Article SysID"] = c.data.article_sys_id;
    payload.data["Language"] = c.selectedLanguage || "en";
    snAnalytics.addEvent(payload);

    populateBreadCrumbURLs();

    function populateBreadCrumbURLs() {
        if (c.data.breadCrumb) {
            if (c.data.breadCrumb[0].type == 'kb_knowledge_base') {
                if (c.data.showKbHomeLink && c.data.kb_knowledge_page != 'kb_search') {
                    c.data.breadCrumb[0].url = '?id=' + c.data.kb_knowledge_page + '&kb_id=' + c.data.breadCrumb[0].values.kb_knowledge_base;
                } else {
                    c.data.breadCrumb[0].url = '?id=kb_search&kb_knowledge_base=' + c.data.breadCrumb[0].values.kb_knowledge_base;
                }
            }

            for (var i = 1; i < c.data.breadCrumb.length; i++) {
                if (c.data.breadCrumb[i].type == 'kb_category') {
                    if (c.data.showKbHomeLink && c.data.kb_knowledge_page != 'kb_search') {
                        if (c.data.breadCrumb[i].values.kb_category == "NULL_VALUE") {
                            c.data.breadCrumb.splice(i, 1);
                        } else {
                            c.data.breadCrumb[i].url = '?id=kb_category&kb_id=' + c.data.breadCrumb[i].values.kb_knowledge_base + '&kb_category=' + c.data.breadCrumb[i].values.kb_category;
                        }
                    } else {
                        c.data.breadCrumb[i].url = '?id=kb_search&kb_knowledge_base=' + c.data.breadCrumb[i].values.kb_knowledge_base + '&kb_category=' + c.data.breadCrumb[i].values.kb_category;
                    }
                }
            }
        }
    }

    var shouldSetTitle = c.data.params.sysparm_language && (c.data.number != c.data.params.sysparm_article);
    if (c.options.set_page_title != 'false' || shouldSetTitle) {
        if (c.data.page_title) {
            // setting default page title for supporting km seo
            $window.document.title = c.data.page_title;
            var metaTag = $('meta[custom-tag][name="description"]')[0];

            if (metaTag)
                metaTag.content = c.data.meta_tag;
        }
    }

    c.showVersions = false;
    c.toggleVersions = function() {
        c.showVersions = !c.showVersions;
    };

    c.selectLanguage = function(ind) {
        var viewAsUser = "";

        if (c.data.params.view_as_user.length > 0)
            viewAsUser = "&view_as_user=" + c.data.params.view_as_user;

        $window.location.replace('?id=' + c.data.params.sysparm_article_view_page_id + '&sys_kb_id=' + c.data.langList[ind].sys_id + viewAsUser);
    };

    c.showActionMenu = function() {
        if (c.showMenu) {
            return true;
        } else {
            if (c.data.properties && c.data.properties.isSubscriptionEnabled && $window.innerWidth < 992)
                return true;
            else
                return false;
        }
    }

    c.toggleSection = function(field) {
        field.collapsed = !field.collapsed;
        $('#' + field.column).slideToggle("fast");
    };

    c.handleSubscribeButtonFocus = function() {
        if ($scope.data.isSubscribed) {
            $scope.data.subscribeLabel = $rootScope.messages.UNSUBSCRIBE;
            $scope.data.toggleSubscribed = !$scope.data.toggleSubscribed;
        }

    };

    c.handleSubscribeButtonBlur = function() {
        if ($scope.data.isSubscribed) {
            $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBED;
            $scope.data.toggleSubscribed = !$scope.data.toggleSubscribed;
        }
    }
    c.closeUnsubscribeModal = function() {
        $("#unSubscribeModal").modal('hide');
    };

    c.handleSubscription = function(confirmation) {
        c.data.actionName = null;
        if (!$scope.data.isSubscribed) {
            c.data.actionName = 'subscribe';
            c.data.articleSysId = $scope.data.article_sys_id;
            c.data.articleNum = $scope.data.number;
        } else {
            if ($scope.data.isArticleSubscribed && !$scope.data.isArticleSubscribedAtKB) {
                c.data.actionName = "unsubscribe";
                c.data.articleSysId = $scope.data.article_sys_id;
                c.data.articleNum = $scope.data.number;
                c.data.unsubscribeKB = false;
            } else if (!confirmation) {
                //$("#unSubscribeModal").modal();
                var unsubscribeMessage = "<p>" + c.data.messages.UNSUBSCRIBE_CONTENT + "</p><p><b>" + c.data.messages.UNSUBSCRIBE_CONFIRMATION + "</b></p>";
                spModal.open({
                    title: c.data.messages.UNSUBSCRIBE,
                    buttons: [{
                        label: c.data.messages.NO,
                        cancel: true
                    }, {
                        label: c.data.messages.YES,
                        primary: true
                    }],
                    message: unsubscribeMessage
                }).then(function() {
                    c.handleSubscription('Y');
                }, function() {
                    c.closeUnsubscribeModal();
                });

                return;
            } else if (confirmation === 'Y') {
                c.data.actionName = "unsubscribe";
                c.closeUnsubscribeModal();
                c.data.articleSysId = $scope.data.article_sys_id;
                c.data.kbSysId = $scope.data.kbSysId;
                c.data.articleNum = $scope.data.number;
                c.data.kbName = $scope.data.kbName;
                c.data.unsubscribeKB = true;
            }
        }
        c.server.get({
            action: c.data.actionName,
            kbSysId: c.data.kbSysId,
            kbName: c.data.kbName,
            articleSysId: c.data.articleSysId,
            articleNum: c.data.articleNum,
            unsubscribeKB: c.data.unsubscribeKB,
            isArticleSubscribed: c.data.isArticleSubscribed,
            isKBSubscribed: c.data.isArticleSubscribedAtKB
        }).then(function(resp) {
            if (c.data.actionName == 'subscribe') {
                $scope.data.isArticleSubscribed = true;
                $scope.data.isSubscribed = true;
                $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBED;
            } else {
                $scope.data.isArticleSubscribed = false;
                $scope.data.isSubscribed = false;
                $scope.data.isArticleSubscribedAtKB = false;
                $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBE;
            }
            c.showUIMessage('info', resp.data.responseMessage);

        });
    };



    c.submitFlagComments = function() {
        if (!c.data.comment) {
            c.flagMessage = "${Please provide a comment to flag the article}";
            $("#flagComment").focus();
            return false;
        } else {
            $("#submitFlagComment").attr("disabled", true);
            c.server.get({
                action: 'saveFlagComment',
                article_sys_id: c.data.article_sys_id,
                comment: c.data.comment
            }).then(function(resp) {
                if (resp.data.feedbackSuccess)
                    c.showUIMessage('info', c.data.messages.ARTICLE_FLAGGED);
                else
                    c.showUIMessage('error', c.data.messages.RATE_LIMIT_REACHED);
            });
            c.clearComment();

        }

    };

    c.copyPermalink = function() {
        var v = document.createElement('textarea');
        var permalink = document.location.origin + document.location.pathname + '?id=' + c.data.params.sysparm_article_view_page_id + '&sysparm_article=' + $scope.data.number;
        v.innerHTML = permalink;
        v.className = "sr-only";
        document.body.appendChild(v);
        v.select();
        var result = true;
        try {
            result = document.execCommand('copy');
        } catch (err) {
            result = false;
        } finally {
            document.body.removeChild(v);
        }
        if (result === true) {
            c.showUIMessage('info', c.data.messages.PERMALINK_COPIED);
        } else {
            $window.prompt("${Because of a browser limitation the URL can not be placed directly in the clipboard. Please use Ctrl-C to copy the data and escape to dismiss this dialog}", permalink);
        }
        $('p.kb-permalink button').focus();
    };
    var modal = null;
    c.launchFlagModal = function(e) {
        c.clearComment();
        var pageRoot = angular.element('.sp-page-root');
        modal = $uibModal.open({
            title: c.data.messages.FLAG_THIS_ARTICLE,
            scope: $scope,
            templateUrl: 'kb-flag-article-modal',
            keyboard: true,
            controller: function($scope) {
                $scope.$on('modal.closing', function() {
                    pageRoot.attr('aria-hidden', 'false');
                    // Toggle dropdown if not already visible:
                    if ($('.dropdown').find('.moreActionsMenuList').is(":hidden") && !$("#submitFlagComment").attr("disabled")) {
                        $('.more-actions-menu').dropdown('toggle');
                        //Give focus to the flagArticle 
                        $('#flagArticleButton').focus();
                    }
                });
            }
        });
        modal.rendered.then(function() {
            //hide the root page headings when modal is active
            pageRoot.attr('aria-hidden', 'true');
            $("#flagComment").focus();

        });
        e.stopPropagation();
    }

    var taskPopUp = $rootScope.$on("sp.kb.feedback.openTaskPopup", function(event, data) {
        c.ftask = {};
        if (data) {
            c.launchFeedbackTaskModal();
            c.ftask.feedback_action = data.feedback_data.action;
            c.ftask.feedback_rating = data.feedback_data.rating
            c.ftask.action = "createFeedbackTask";

        }
    });

    c.launchFeedbackTaskModal = function() {
        var pageRoot = angular.element('.sp-page-root');
        c.clearFeedbackTask();
        modal = $uibModal.open({
            title: c.data.messages.FEEDBACK,
            windowClass: 'app-modal-window',
            scope: $scope,
            templateUrl: 'kb-feedback-task-modal',
            keyboard: true,
            controller: function($scope) {
                $scope.$on("modal.closing", function() {
                    pageRoot.attr('aria-hidden', 'false');
                    $('#useful_no').focus();

                    if (!c.submitted) {
                        c.data.reason = "4";
                        c.data.details = "";
                    }
                    if (c.ftask.action == "createFeedbackTaskWithFlagComment" && !c.submitted)
                        return;
                    modal = null;
                    c.server.get({
                        action: c.ftask.action,
                        article_sys_id: c.data.article_sys_id,
                        reason: c.data.reason,
                        details: c.data.details,
                        feedback_action: c.ftask.feedback_action,
                        rating: c.ftask.feedback_rating
                    }).then(function(resp) {
                        if (resp.data.responseMessage) {
                            if (resp.data.feedbackSuccess) {
                                c.showUIMessage('info', resp.data.responseMessage);
                            } else {
                                c.showUIMessage('error', resp.data.responseMessage);
                            }

                        }
                    });
                    c.clearFeedbackTask();
                });
            }
        });
        modal.rendered.then(function() {
            //hide the root page headings when modal is active
            pageRoot.attr('aria-hidden', 'true');
            $('.type-multiple_choice input[aria-checked="true"]').focus();
        });

    }

    c.clearComment = function(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        $scope.data.comment = '';
        c.flagMessage = '';
        c.closePopup();
    }

    c.closeTaskPopup = function(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        modal.dismiss({
            $value: "dismiss"
        });
        $('#useful_no').focus();
    }

    c.selectReason = function(e, elem) {
        // space keycode to select the radio button
        if (e.keyCode == 32) {
            $("div.type-multiple_choice").find("input[type=radio]").each(function() {
                $(this).attr("checked", false);
                $(this).attr("aria-checked", false);
                $(this).find("input[type=radio]").attr("checked", false);
                $(this).find("input[type=radio]").attr("aria-checked", false);
            });
            $(e.target).click();
            $(e.target).find("input[type=radio]").click();
        }

    }

    c.showUIMessage = function(type, msg) {
        if (cabrillo.isNative()) {
            cabrillo.message.showMessage(type != 'error' ? cabrillo.message.SUCCESS_MESSAGE_STYLE : cabrillo.message.ERROR_MESSAGE_STYLE, msg);
        } else {
            if (type == 'error')
                spUtil.addErrorMessage(msg);
            else
                spUtil.addInfoMessage(msg);
        }
    }

    c.closePopup = function() {
        if (modal) {
            modal.dismiss();
        }
    }

    c.clearFeedbackTask = function() {
        c.submitted = false;
        c.data.reason = '4';
        c.data.details = '';
        c.flagMessage = '';
        c.ftask = {};
        c.closePopup();
    }

    c.submitFeedbackTask = function() {
        if (!c.data.reason) {
            c.flagMessage = "${Please provide the mandatory details}";
            $("#detailsComment").focus();
            return false;
        } else {
            c.submitted = true;
            c.closePopup();
        }
    }

    c.imgModalClose = function() {
        c.imageInstance.close();
    }

    c.getLabelForTemplateField = function(label, isCollapsed) {
        if (isCollapsed)
            return label + " " + c.data.messages.COLLAPSED_FIELD;
        else
            return label + " " + c.data.messages.EXPANDED_FIELD;
    }

    $scope.$on("$destroy", taskPopUp);

    $("#flagComment").keydown(function(ev) {
        if (ev.which == 13)
            $("#flagComment").click();
    });

    c.handleKeyDown = function(ev) {
        if (ev.which == 13)
            $(ev.target).click();
    }

    var favoriteEvent = $rootScope.$on('favorite', function(e, favorite) {
        $scope.showFavorite = favorite.showFavorite;
        $scope.isFavorite = favorite.isFavorite;
    });
    $scope.$on("$destroy", favoriteEvent);

    $scope.toggleFavorite = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.$broadcast('toggleFavorite');
    }

}
