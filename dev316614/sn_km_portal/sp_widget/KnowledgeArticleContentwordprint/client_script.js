api.controller = function($rootScope, $scope, $window, $timeout, spUtil, $sce, spModal, $uibModal, $location, cabrillo, snAnalytics) {
    /* widget controller */
    var c = this;
    // Fallback inline logo for FFI text mark (Forsvarets forskningsinstitutt)
    var fallbackLogoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Navnetrekk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1422.39 239.87">
  <g>
    <path d="M137.83,37.58V1.42H22.89C11.03,1.42,1.42,11.03,1.42,22.89V215.7H22.89c11.79,0,21.35-9.5,21.47-21.26,0,.07,0,.14,0,.22V127.89H116.59v-36.16h-50.75c-11.86,0-21.47,9.61-21.47,21.47V37.58h93.47Z"/>
    <path d="M352.51,1.42c-11.86,0-21.47,9.61-21.47,21.47V215.7h21.47c11.79,0,21.35-9.5,21.47-21.26,0,.07,0,.14,0,.22V1.42h-21.47Z"/>
    <path d="M302.61,37.58V1.42h-114.94c-11.86,0-21.47,9.61-21.47,21.47V215.7h21.47c11.79,0,21.35-9.5,21.47-21.26,0,.07,0,.14,0,.22V127.89h72.23v-36.16h-50.75c-11.86,0-21.47,9.61-21.47,21.47V37.58h93.47Z"/>
  </g>
  <g>
    <polygon points="493.67 12.2 493.67 3.08 441.29 3.08 441.29 87.62 452.44 87.62 452.44 50.28 487.92 50.28 487.92 41.17 452.44 41.17 452.44 12.2 493.67 12.2"/>
    <path d="M552.94,73.36c2.34-4.86,3.51-10.34,3.51-16.46v-.75c0-9.83-2.64-17.71-7.92-23.63-5.28-5.92-12.2-8.88-20.76-8.88-5.54,0-10.46,1.34-14.78,4.01-4.32,2.67-7.68,6.47-10.1,11.38-2.42,4.92-3.63,10.45-3.63,16.61v.75c0,9.75,2.64,17.59,7.93,23.51,5.28,5.92,12.18,8.88,20.7,8.88,5.65,0,10.65-1.35,15.01-4.06,4.36-2.71,7.7-6.49,10.04-11.35Zm-12.05,.23c-3.21,4.28-7.55,6.42-13.01,6.42s-9.75-2.11-12.98-6.33c-3.23-4.22-4.85-9.81-4.85-16.78,0-7.86,1.63-13.9,4.88-18.12,3.25-4.22,7.53-6.33,12.83-6.33s9.76,2.14,13.04,6.42c3.27,4.28,4.91,9.86,4.91,16.75,0,7.7-1.61,13.69-4.82,17.97Z"/>
    <path d="M600.27,34.43v-9.99c-1.08-.54-2.67-.81-4.76-.81-6.46,0-11.46,2.81-14.98,8.42l-.17-7.26h-10.45v62.82h10.74V43.03c2.52-6,7.3-9,14.34-9,1.9,0,3.66,.14,5.28,.41Z"/>
    <path d="M644.02,77.54c-2.46,1.65-5.72,2.47-9.78,2.47-4.41,0-7.96-1.05-10.65-3.16-2.69-2.11-4.13-4.96-4.33-8.56h-10.74c0,3.72,1.09,7.17,3.28,10.36,2.19,3.19,5.22,5.68,9.09,7.46,3.87,1.78,8.32,2.67,13.36,2.67,7.16,0,12.99-1.69,17.48-5.08,4.49-3.39,6.73-7.89,6.73-13.5,0-3.37-.8-6.22-2.41-8.56-1.61-2.34-4.07-4.34-7.4-6.01-3.33-1.66-7.67-3.1-13.03-4.3-5.36-1.2-9.07-2.46-11.12-3.77-2.05-1.32-3.08-3.27-3.08-5.86,0-2.75,1.1-4.97,3.31-6.68,2.21-1.7,5.26-2.55,9.17-2.55s6.94,1.07,9.44,3.19c2.5,2.13,3.74,4.66,3.74,7.61h10.8c0-5.73-2.22-10.43-6.65-14.11-4.43-3.68-10.21-5.52-17.33-5.52s-12.34,1.78-16.69,5.34c-4.36,3.56-6.53,7.92-6.53,13.06,0,3.1,.76,5.77,2.29,8.01,1.53,2.25,3.89,4.18,7.08,5.81s7.51,3.02,12.95,4.18c5.44,1.16,9.25,2.55,11.44,4.15,2.19,1.61,3.28,3.86,3.28,6.76,0,2.75-1.23,4.95-3.69,6.59Z"/>
    <polygon points="698.17 87.62 720.7 24.79 709.72 24.79 694.16 73.04 678.19 24.79 667.22 24.79 689.98 87.62 698.17 87.62"/>
    <path d="M781.2,86.69c-1.47-3.41-2.21-7.99-2.21-13.76v-28.91c-.16-6.35-2.28-11.33-6.39-14.95-4.1-3.62-9.77-5.43-17.01-5.43-4.57,0-8.76,.85-12.57,2.55-3.81,1.7-6.83,4.02-9.06,6.94-2.23,2.92-3.34,5.95-3.34,9.09h10.8c0-2.75,1.3-5.09,3.89-7.03,2.59-1.93,5.81-2.9,9.64-2.9,4.37,0,7.68,1.11,9.93,3.34,2.25,2.23,3.37,5.22,3.37,8.97v4.94h-10.45c-9.02,0-16.02,1.81-20.99,5.43-4.97,3.62-7.46,8.7-7.46,15.24,0,5.38,1.98,9.82,5.95,13.33,3.97,3.5,9.05,5.25,15.24,5.25,6.93,0,12.89-2.59,17.88-7.78,.39,3.17,.89,5.38,1.51,6.62h11.26v-.93Zm-12.95-16.66c-1.36,2.79-3.54,5.05-6.56,6.79-3.02,1.74-6.21,2.61-9.58,2.61s-6.41-.95-8.65-2.84c-2.24-1.9-3.37-4.53-3.37-7.9,0-7.7,6.58-11.55,19.74-11.55h8.42v12.89Z"/>
    <path d="M808.55,43.03c2.52-6,7.3-9,14.34-9,1.9,0,3.66,.14,5.28,.41v-9.99c-1.08-.54-2.67-.81-4.76-.81-6.46,0-11.46,2.81-14.98,8.42l-.17-7.26h-10.45v62.82h10.74V43.03Z"/>
    <path d="M888.68,76.64l-6.56-5.11c-1.97,2.55-4.28,4.61-6.91,6.15-2.63,1.55-5.84,2.32-9.64,2.32-5.34,0-9.74-1.91-13.21-5.72-3.46-3.81-5.27-8.82-5.43-15.01h42.56v-4.47c0-10.02-2.26-17.73-6.79-23.11-4.53-5.38-10.88-8.07-19.04-8.07-4.99,0-9.63,1.38-13.91,4.15-4.28,2.77-7.61,6.6-9.99,11.5-2.38,4.9-3.57,10.46-3.57,16.69v1.97c0,9.37,2.67,16.85,8.01,22.44,5.34,5.59,12.27,8.39,20.79,8.39,10.53,0,18.42-4.04,23.69-12.13Zm-35.94-39.45c2.94-3.15,6.58-4.73,10.92-4.73s8.05,1.5,10.68,4.5c2.63,3,4.1,7.23,4.41,12.69v.81h-31.47c.7-5.69,2.51-10.11,5.46-13.27Z"/>
    <path d="M920.04,77.77c-1.04-1.26-1.57-3.15-1.57-5.67V33.1h11.73v-8.3h-11.73V9.58h-10.74v15.21h-11.44v8.3h11.44v38.96c0,5.34,1.22,9.46,3.66,12.37,2.44,2.9,6.06,4.35,10.86,4.35,2.67,0,5.42-.38,8.24-1.15v-8.66c-2.17,.46-3.87,.7-5.11,.7-2.52,0-4.3-.63-5.34-1.89Z"/>
    <path d="M976.62,77.54c-2.46,1.65-5.72,2.47-9.78,2.47-4.41,0-7.96-1.05-10.65-3.16-2.69-2.11-4.13-4.96-4.33-8.56h-10.74c0,3.72,1.09,7.17,3.28,10.36,2.19,3.19,5.22,5.68,9.09,7.46,3.87,1.78,8.32,2.67,13.35,2.67,7.16,0,12.99-1.69,17.48-5.08,4.49-3.39,6.73-7.89,6.73-13.5,0-3.37-.8-6.22-2.41-8.56-1.61-2.34-4.07-4.34-7.4-6.01-3.33-1.66-7.67-3.1-13.03-4.3-5.36-1.2-9.07-2.46-11.12-3.77-2.05-1.32-3.08-3.27-3.08-5.86,0-2.75,1.1-4.97,3.31-6.68,2.21-1.7,5.26-2.55,9.17-2.55s6.94,1.07,9.44,3.19c2.5,2.13,3.74,4.66,3.74,7.61h10.8c0-5.73-2.22-10.43-6.65-14.11-4.43-3.68-10.21-5.52-17.33-5.52s-12.34,1.78-16.69,5.34c-4.36,3.56-6.53,7.92-6.53,13.06,0,3.1,.76,5.77,2.29,8.01,1.53,2.25,3.89,4.18,7.08,5.81s7.51,3.02,12.95,4.18c5.44,1.16,9.25,2.55,11.44,4.15,2.19,1.61,3.28,3.86,3.28,6.76,0,2.75-1.23,4.95-3.69,6.59Z"/>
  </g>
  <g>
    <path d="M448.3,128.83c-3.6,3.68-5.4,8.88-5.4,15.62v6.44h-9.93v8.3h9.93v54.52h10.74v-54.52h13.41v-8.3h-13.41v-6.64c0-3.81,.95-6.73,2.84-8.77,1.9-2.04,4.59-3.06,8.07-3.06,2.05,0,3.99,.17,5.81,.52l.58-8.66c-2.44-.65-4.9-.98-7.37-.98-6.58,0-11.67,1.84-15.27,5.52Z"/>
    <path d="M503.55,149.73c-5.54,0-10.46,1.34-14.78,4.01-4.32,2.67-7.68,6.46-10.1,11.38-2.42,4.92-3.63,10.45-3.63,16.61v.75c0,9.76,2.64,17.59,7.93,23.52,5.28,5.92,12.18,8.88,20.7,8.88,5.65,0,10.65-1.35,15.01-4.06,4.36-2.71,7.7-6.49,10.04-11.35,2.34-4.86,3.51-10.34,3.51-16.46v-.75c0-9.83-2.64-17.71-7.92-23.63-5.28-5.92-12.2-8.88-20.76-8.88Zm13.12,49.96c-3.21,4.28-7.55,6.42-13.01,6.42s-9.75-2.11-12.98-6.33c-3.23-4.22-4.85-9.81-4.85-16.78,0-7.86,1.63-13.9,4.88-18.12,3.25-4.22,7.53-6.33,12.83-6.33s9.76,2.14,13.04,6.41c3.27,4.28,4.91,9.86,4.91,16.75,0,7.7-1.61,13.69-4.82,17.97Z"/>
    <path d="M556.31,158.15l-.17-7.26h-10.45v62.82h10.74v-44.59c2.52-6,7.3-9,14.34-9,1.9,0,3.66,.14,5.28,.41v-9.99c-1.08-.54-2.67-.81-4.76-.81-6.46,0-11.46,2.81-14.98,8.42Z"/>
    <path d="M624.42,181.73c-3.33-1.66-7.67-3.1-13.03-4.3-5.36-1.2-9.07-2.46-11.12-3.77-2.05-1.32-3.08-3.27-3.08-5.86,0-2.75,1.1-4.97,3.31-6.68,2.21-1.7,5.26-2.55,9.17-2.55s6.94,1.06,9.44,3.19c2.5,2.13,3.74,4.66,3.74,7.61h10.8c0-5.73-2.22-10.43-6.65-14.11-4.43-3.68-10.21-5.52-17.33-5.52s-12.34,1.78-16.69,5.34c-4.36,3.56-6.53,7.92-6.53,13.06,0,3.1,.76,5.77,2.29,8.01,1.53,2.25,3.89,4.18,7.08,5.81,3.19,1.63,7.51,3.02,12.95,4.18,5.44,1.16,9.25,2.55,11.44,4.15,2.19,1.61,3.28,3.86,3.28,6.76,0,2.75-1.23,4.94-3.69,6.59-2.46,1.65-5.72,2.47-9.78,2.47-4.41,0-7.96-1.05-10.65-3.16-2.69-2.11-4.13-4.96-4.33-8.56h-10.74c0,3.72,1.09,7.17,3.28,10.36,2.19,3.19,5.22,5.68,9.09,7.46,3.87,1.78,8.32,2.67,13.35,2.67,7.16,0,12.99-1.69,17.48-5.08,4.49-3.39,6.73-7.89,6.73-13.5,0-3.37-.8-6.22-2.41-8.56-1.61-2.34-4.07-4.34-7.4-6.01Z"/>
    <polygon points="699.38 150.9 686.32 150.9 666.75 171.57 661 178.47 661 124.53 650.26 124.53 650.26 213.72 661 213.72 661 191.65 667.74 184.63 689.63 213.72 702.22 213.72 674.94 177.14 699.38 150.9"/>
    <path d="M741.77,149.73c-7.74,0-14.01,3.02-18.81,9.06l-.35-7.9h-10.16v62.82h10.74v-44.77c1.47-3.02,3.52-5.46,6.15-7.32,2.63-1.86,5.69-2.79,9.17-2.79,4.3,0,7.46,1.08,9.49,3.25,2.03,2.17,3.07,5.52,3.11,10.04v41.57h10.74v-41.51c-.12-14.98-6.81-22.47-20.09-22.47Z"/>
    <rect x="781.1" y="150.9" width="10.74" height="62.82"/>
    <path d="M786.45,128.02c-2.09,0-3.67,.6-4.73,1.8-1.06,1.2-1.6,2.67-1.6,4.41s.53,3.19,1.6,4.36c1.06,1.16,2.64,1.74,4.73,1.74s3.68-.58,4.76-1.74c1.08-1.16,1.63-2.61,1.63-4.36s-.54-3.21-1.63-4.41c-1.08-1.2-2.67-1.8-4.76-1.8Z"/>
    <path d="M840.2,149.73c-7.74,0-14.01,3.02-18.81,9.06l-.35-7.9h-10.16v62.82h10.74v-44.77c1.47-3.02,3.52-5.46,6.15-7.32,2.63-1.86,5.69-2.79,9.17-2.79,4.3,0,7.46,1.08,9.49,3.25,2.03,2.17,3.07,5.52,3.11,10.04v41.57h10.74v-41.51c-.12-14.98-6.81-22.47-20.09-22.47Z"/>
    <path d="M918.64,157.86c-4.3-5.42-10.28-8.13-17.94-8.13s-13.47,2.89-18,8.68c-4.53,5.79-6.79,13.58-6.79,23.37s2.27,18.29,6.82,24.21c4.55,5.92,10.5,8.88,17.85,8.88s13.3-2.48,17.59-7.43v5.4c0,5.34-1.46,9.48-4.38,12.43-2.92,2.94-7,4.41-12.22,4.41-6.66,0-12.29-2.84-16.9-8.53l-5.57,6.44c2.28,3.37,5.59,6.02,9.93,7.95,4.33,1.94,8.77,2.9,13.3,2.9,8.13,0,14.6-2.34,19.42-7.02,4.82-4.68,7.23-11.09,7.23-19.22v-61.31h-9.81l-.52,6.97Zm-.46,38.67c-3.17,6.15-8.15,9.23-14.92,9.23-5.23,0-9.29-2.02-12.19-6.07-2.9-4.04-4.35-9.61-4.35-16.69,0-7.97,1.47-13.99,4.41-18.06,2.94-4.06,7.03-6.1,12.25-6.1,6.58,0,11.51,3,14.81,9v28.68Z"/>
    <path d="M983.68,181.73c-3.33-1.66-7.67-3.1-13.03-4.3-5.36-1.2-9.07-2.46-11.12-3.77-2.05-1.32-3.08-3.27-3.08-5.86,0-2.75,1.1-4.97,3.31-6.68,2.21-1.7,5.26-2.55,9.17-2.55s6.94,1.06,9.44,3.19c2.5,2.13,3.74,4.66,3.74,7.61h10.8c0-5.73-2.22-10.43-6.65-14.11-4.43-3.68-10.21-5.52-17.33-5.52s-12.34,1.78-16.69,5.34c-4.36,3.56-6.53,7.92-6.53,13.06,0,3.1,.76,5.77,2.29,8.01,1.53,2.25,3.89,4.18,7.08,5.81,3.19,1.63,7.51,3.02,12.95,4.18,5.44,1.16,9.25,2.55,11.44,4.15,2.19,1.61,3.28,3.86,3.28,6.76,0,2.75-1.23,4.94-3.69,6.59-2.46,1.65-5.72,2.47-9.78,2.47-4.41,0-7.96-1.05-10.65-3.16-2.69-2.11-4.13-4.96-4.33-8.56h-10.74c0,3.72,1.09,7.17,3.28,10.36,2.19,3.19,5.22,5.68,9.09,7.46,3.87,1.78,8.32,2.67,13.35,2.67,7.16,0,12.99-1.69,17.48-5.08,4.49-3.39,6.73-7.89,6.73-13.5,0-3.37-.8-6.22-2.41-8.56-1.61-2.34-4.07-4.34-7.4-6.01Z"/>
    <path d="M1017.78,128.02c-2.09,0-3.67,.6-4.73,1.8-1.06,1.2-1.6,2.67-1.6,4.41s.53,3.19,1.6,4.36c1.06,1.16,2.64,1.74,4.73,1.74s3.68-.58,4.76-1.74c1.08-1.16,1.63-2.61,1.63-4.36s-.54-3.21-1.63-4.41c-1.08-1.2-2.67-1.8-4.76-1.8Z"/>
    <rect x="1010.46" y="150.9" width="10.74" height="62.82"/>
    <path d="M1069.62,149.73c-7.74,0-14.01,3.02-18.81,9.06l-.35-7.9h-10.16v62.82h10.74v-44.77c1.47-3.02,3.52-5.46,6.15-7.32,2.63-1.86,5.69-2.79,9.17-2.79,4.3,0,7.46,1.08,9.49,3.25,2.03,2.17,3.07,5.52,3.11,10.04v41.57h10.74v-41.51c-.12-14.98-6.81-22.47-20.09-22.47Z"/>
    <path d="M1143.8,181.73c-3.33-1.66-7.67-3.1-13.03-4.3-5.36-1.2-9.07-2.46-11.12-3.77-2.05-1.32-3.08-3.27-3.08-5.86,0-2.75,1.1-4.97,3.31-6.68,2.21-1.7,5.26-2.55,9.17-2.55s6.94,1.06,9.44,3.19c2.5,2.13,3.74,4.66,3.74,7.61h10.8c0-5.73-2.22-10.43-6.65-14.11-4.43-3.68-10.21-5.52-17.33-5.52s-12.34,1.78-16.69,5.34c-4.36,3.56-6.53,7.92-6.53,13.06,0,3.1,.76,5.77,2.29,8.01,1.53,2.25,3.89,4.18,7.08,5.81,3.19,1.63,7.51,3.02,12.95,4.18,5.44,1.16,9.25,2.55,11.44,4.15,2.19,1.61,3.28,3.86,3.28,6.76,0,2.75-1.23,4.94-3.69,6.59-2.46,1.65-5.72,2.47-9.78,2.47-4.41,0-7.96-1.05-10.65-3.16-2.69-2.11-4.13-4.96-4.33-8.56h-10.74c0,3.72,1.09,7.17,3.28,10.36,2.19,3.19,5.22,5.68,9.09,7.46,3.87,1.78,8.32,2.67,13.35,2.67,7.16,0,12.99-1.69,17.48-5.08,4.49-3.39,6.73-7.89,6.73-13.5,0-3.37-.8-6.22-2.41-8.56-1.61-2.34-4.07-4.34-7.4-6.01Z"/>
    <path d="M1185.73,203.87c-1.04-1.26-1.57-3.15-1.57-5.67v-39.01h11.73v-8.3h-11.73v-15.21h-10.74v15.21h-11.44v8.3h11.44v38.96c0,5.34,1.22,9.46,3.66,12.37,2.44,2.9,6.06,4.36,10.86,4.36,2.67,0,5.42-.38,8.24-1.15v-8.66c-2.17,.47-3.87,.7-5.11,.7-2.52,0-4.3-.63-5.34-1.89Z"/>
    <rect x="1212.4" y="150.9" width="10.74" height="62.82"/>
    <path d="M1217.74,128.02c-2.09,0-3.67,.6-4.73,1.8-1.06,1.2-1.6,2.67-1.6,4.41s.53,3.19,1.6,4.36c1.06,1.16,2.64,1.74,4.73,1.74s3.68-.58,4.76-1.74c1.08-1.16,1.63-2.61,1.63-4.36s-.54-3.21-1.63-4.41c-1.08-1.2-2.67-1.8-4.76-1.8Z"/>
    <path d="M1259.37,203.87c-1.04-1.26-1.57-3.15-1.57-5.67v-39.01h11.73v-8.3h-11.73v-15.21h-10.74v15.21h-11.44v8.3h11.44v38.96c0,5.34,1.22,9.46,3.66,12.37,2.44,2.9,6.06,4.36,10.86,4.36,2.67,0,5.42-.38,8.24-1.15v-8.66c-2.17,.47-3.87,.7-5.11,.7-2.52,0-4.3-.63-5.34-1.89Z"/>
    <path d="M1322.55,196.59c-2.71,6.12-8.17,9.17-16.37,9.17-7.74,0-11.61-4.76-11.61-14.28v-40.58h-10.74v40.88c.04,7.63,1.81,13.38,5.31,17.27,3.5,3.89,8.6,5.84,15.3,5.84,8.09,0,14.23-2.46,18.41-7.37l.23,6.21h10.22v-62.82h-10.74v45.69Z"/>
    <path d="M1368.71,203.87c-1.04-1.26-1.57-3.15-1.57-5.67v-39.01h11.73v-8.3h-11.73v-15.21h-10.74v15.21h-11.44v8.3h11.44v38.96c0,5.34,1.22,9.46,3.66,12.37,2.44,2.9,6.06,4.36,10.86,4.36,2.67,0,5.42-.38,8.24-1.15v-8.66c-2.17,.47-3.87,.7-5.11,.7-2.52,0-4.3-.63-5.34-1.89Z"/>
    <path d="M1415.87,205.76c-2.52,0-4.3-.63-5.34-1.89-1.04-1.26-1.57-3.15-1.57-5.67v-39.01h11.73v-8.3h-11.73v-15.21h-10.74v15.21h-11.44v8.3h11.44v38.96c0,5.34,1.22,9.46,3.66,12.37,2.44,2.9,6.06,4.36,10.86,4.36,2.67,0,5.42-.38,8.24-1.15v-8.66c-2.17,.47-3.87,.7-5.11,.7Z"/>
  </g>
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

    c.printArticle = function (myID) {
        // Keep a copy of the current DOM so we can restore it later
        var originalHTML = document.body.innerHTML;

        // Grab the current article HTML
        var articleElement = document.getElementById(myID);
        if (!articleElement) {
            // Fallback: if the element id is wrong, just do a normal print
            window.print();
            return;
        }

        var escapeHtml = function (value) {
            if (value === undefined || value === null)
                return '';
            return String(value).replace(/[&<>"']/g, function (char) {
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
        var formatDateOnly = function (val) {
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
        // Always use embedded FFI text logo to avoid truncated attachments
        var logoSrc = fallbackLogoUrl;
        // Give the logo more space so the full text mark stays visible when printed
        var logoMarkup =
            '<div style="display:flex; justify-content:center; align-items:center; width:100%; padding:8px 6px;">' +
            '<img src="' + logoSrc + '" alt="FFI logo" style="width:220px; max-width:100%; height:auto; display:block;" />' +
            '</div>';

        var printStylesHTML =
            '<style>' +
            '@page {' +
            ' margin: 10mm 10mm 14mm 10mm;' +
            ' @bottom-center {' +
            '  content: "Side " counter(page) " av " counter(pages);' +
            '  font-family: Arial, sans-serif;' +
            '  font-size: 10px;' +
            '  color: #666;' +
            ' }' +
            '}' +
            '@media print {' +
            ' body { margin: 0 !important; }' +
            ' .km-print-color {' +
            '  -webkit-print-color-adjust: exact !important;' +
            '  print-color-adjust: exact !important;' +
            '  color-adjust: exact !important;' +
            ' }' +
            ' a[href]:after { content: none !important; }' +
            '}' +
            '</style>';

        var metadataHeaderHTML =
            printStylesHTML +
            '<div class="km-print-color" style="font-family: Arial, sans-serif; font-size: 11px; color:#000; padding: 0 4px; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;">' +
            '<table style="width: 100%; border-collapse: collapse; border: 1px solid #000; font-size: 11px; box-sizing: border-box;">' +
            '<tr style="height: 60px;">' +
            '<td style="width: 24%; min-width: 220px; border: 1px solid #000; text-align: center; vertical-align: middle; padding: 8px 8px; box-sizing: border-box;">' +
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
            '<div style="text-align: center; font-style: italic; font-size: 11px; margin-top: 20px; margin-bottom: 16px; color: #000;">Vær oppmerksom på at dokumentet kan være endret etter utskrift</div>' +
            '</div>';

        // Build the printable document: metadata header + article content
        document.body.innerHTML = metadataHeaderHTML + articleHTML;

        // Remove elements you don’t want in the PDF
        document.querySelectorAll('.title-secondary-data, .transparent-button')
            .forEach(function (el) {
                el.parentNode && el.parentNode.removeChild(el);
            });

        // Wait for images (logo/attachments) to load before printing
        var printed = false;
        var restoreAndReload = function () {
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
            var done = function () {
                remaining--;
                if (remaining <= 0)
                    restoreAndReload();
            };
            imgs.forEach(function (img) {
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

    c.getDisplayDate = function (timestamp) {
        if (!timestamp)
            return '';

        var match = String(timestamp).match(/^\s*(\d{4})-(\d{2})-(\d{2})/);
        if (match)
            return match[3] + '.' + match[2] + '.' + match[1];

        var parsedDate = new Date(timestamp);
        if (isNaN(parsedDate.getTime()))
            return timestamp;

        var day = ('0' + parsedDate.getDate()).slice(-2);
        var month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
        return day + '.' + month + '.' + parsedDate.getFullYear();
    };

    $window.onpopstate = function (e) {
        if (e && e.state && e.state.addSPA) {
            $location.search('spa', null);
            $location.replace();
        }
    };

    if (c.data.isValid) {
        if (c.data.kbContentData && c.data.kbContentData.isTemplate) {
            //alert(c.data.kbContentData.data);
            c.data.kbContentData.data.forEach(function (field) {
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
    $timeout(function () {
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
    c.showMenu = !!c.data.properties;
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
    c.toggleVersions = function () {
        c.showVersions = !c.showVersions;
    };

    c.selectLanguage = function (ind) {
        var viewAsUser = "";

        if (c.data.params.view_as_user.length > 0)
            viewAsUser = "&view_as_user=" + c.data.params.view_as_user;

        $window.location.replace('?id=' + c.data.params.sysparm_article_view_page_id + '&sys_kb_id=' + c.data.langList[ind].sys_id + viewAsUser);
    };

    c.showActionMenu = function () {
        if (c.showMenu) {
            return true;
        } else {
            if (c.data.properties && c.data.properties.isSubscriptionEnabled && $window.innerWidth < 992)
                return true;
            else
                return false;
        }
    }

    c.toggleSection = function (field) {
        field.collapsed = !field.collapsed;
        $('#' + field.column).slideToggle("fast");
    };

    c.handleSubscribeButtonFocus = function () {
        if ($scope.data.isSubscribed) {
            $scope.data.subscribeLabel = $rootScope.messages.UNSUBSCRIBE;
            $scope.data.toggleSubscribed = !$scope.data.toggleSubscribed;
        }

    };

    c.handleSubscribeButtonBlur = function () {
        if ($scope.data.isSubscribed) {
            $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBED;
            $scope.data.toggleSubscribed = !$scope.data.toggleSubscribed;
        }
    }
    c.closeUnsubscribeModal = function () {
        $("#unSubscribeModal").modal('hide');
    };

    c.handleSubscription = function (confirmation) {
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
                }).then(function () {
                    c.handleSubscription('Y');
                }, function () {
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
        }).then(function (resp) {
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



    c.submitFlagComments = function () {
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
            }).then(function (resp) {
                if (resp.data.feedbackSuccess)
                    c.showUIMessage('info', c.data.messages.ARTICLE_FLAGGED);
                else
                    c.showUIMessage('error', c.data.messages.RATE_LIMIT_REACHED);
            });
            c.clearComment();

        }

    };

    c.copyPermalink = function () {
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
    c.launchFlagModal = function (e) {
        c.clearComment();
        var pageRoot = angular.element('.sp-page-root');
        modal = $uibModal.open({
            title: c.data.messages.FLAG_THIS_ARTICLE,
            scope: $scope,
            templateUrl: 'kb-flag-article-modal',
            keyboard: true,
            controller: function ($scope) {
                $scope.$on('modal.closing', function () {
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
        modal.rendered.then(function () {
            //hide the root page headings when modal is active
            pageRoot.attr('aria-hidden', 'true');
            $("#flagComment").focus();

        });
        e.stopPropagation();
    }

    var taskPopUp = $rootScope.$on("sp.kb.feedback.openTaskPopup", function (event, data) {
        c.ftask = {};
        if (data) {
            c.launchFeedbackTaskModal();
            c.ftask.feedback_action = data.feedback_data.action;
            c.ftask.feedback_rating = data.feedback_data.rating
            c.ftask.action = "createFeedbackTask";

        }
    });

    c.launchFeedbackTaskModal = function () {
        var pageRoot = angular.element('.sp-page-root');
        c.clearFeedbackTask();
        modal = $uibModal.open({
            title: c.data.messages.FEEDBACK,
            windowClass: 'app-modal-window',
            scope: $scope,
            templateUrl: 'kb-feedback-task-modal',
            keyboard: true,
            controller: function ($scope) {
                $scope.$on("modal.closing", function () {
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
                    }).then(function (resp) {
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
        modal.rendered.then(function () {
            //hide the root page headings when modal is active
            pageRoot.attr('aria-hidden', 'true');
            $('.type-multiple_choice input[aria-checked="true"]').focus();
        });

    }

    c.clearComment = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        $scope.data.comment = '';
        c.flagMessage = '';
        c.closePopup();
    }

    c.closeTaskPopup = function (e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        modal.dismiss({
            $value: "dismiss"
        });
        $('#useful_no').focus();
    }

    c.selectReason = function (e, elem) {
        // space keycode to select the radio button
        if (e.keyCode == 32) {
            $("div.type-multiple_choice").find("input[type=radio]").each(function () {
                $(this).attr("checked", false);
                $(this).attr("aria-checked", false);
                $(this).find("input[type=radio]").attr("checked", false);
                $(this).find("input[type=radio]").attr("aria-checked", false);
            });
            $(e.target).click();
            $(e.target).find("input[type=radio]").click();
        }

    }

    c.showUIMessage = function (type, msg) {
        if (cabrillo.isNative()) {
            cabrillo.message.showMessage(type != 'error' ? cabrillo.message.SUCCESS_MESSAGE_STYLE : cabrillo.message.ERROR_MESSAGE_STYLE, msg);
        } else {
            if (type == 'error')
                spUtil.addErrorMessage(msg);
            else
                spUtil.addInfoMessage(msg);
        }
    }

    c.closePopup = function () {
        if (modal) {
            modal.dismiss();
        }
    }

    c.clearFeedbackTask = function () {
        c.submitted = false;
        c.data.reason = '4';
        c.data.details = '';
        c.flagMessage = '';
        c.ftask = {};
        c.closePopup();
    }

    c.submitFeedbackTask = function () {
        if (!c.data.reason) {
            c.flagMessage = "${Please provide the mandatory details}";
            $("#detailsComment").focus();
            return false;
        } else {
            c.submitted = true;
            c.closePopup();
        }
    }

    c.imgModalClose = function () {
        c.imageInstance.close();
    }

    c.getLabelForTemplateField = function (label, isCollapsed) {
        if (isCollapsed)
            return label + " " + c.data.messages.COLLAPSED_FIELD;
        else
            return label + " " + c.data.messages.EXPANDED_FIELD;
    }

    $scope.$on("$destroy", taskPopUp);

    $("#flagComment").keydown(function (ev) {
        if (ev.which == 13)
            $("#flagComment").click();
    });

    c.handleKeyDown = function (ev) {
        if (ev.which == 13)
            $(ev.target).click();
    }

    var favoriteEvent = $rootScope.$on('favorite', function (e, favorite) {
        $scope.showFavorite = favorite.showFavorite;
        $scope.isFavorite = favorite.isFavorite;
    });
    $scope.$on("$destroy", favoriteEvent);

    $scope.toggleFavorite = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.$broadcast('toggleFavorite');
    }

};
