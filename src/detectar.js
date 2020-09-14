;(function () {
  'use strict';
  window.addEventListener('devicemotion', handleMotion, true);
  window.addEventListener('deviceorientation', handleOrientation, true);
  queryPermissions();

  function queryPermissions () {
    [
      'accelerometer',
      'ambient-light',
      'bluetooth',
      'geolocation',
      'gyroscope',
      'magnetometer',
      'nfc',
    ].forEach(function (permission) {
      navigator.permissions
        .query({ name: permission })
	.then(function (permissionStatus) {
	  console.log('Permission result ' + permissionStatus.state);
          document.querySelector('#' + permission + ' .remove-with-js').remove();

	  switch (permissionStatus.state) {
	    case 'prompt':
	      showPromptForPermission(permission, permissionStatus);
	      break;
	    default:
	      console.info('Missing implementation for state')
	  }
	})
	.catch(function (error) {
	  console.log('Permission error', permission, error);

          document.querySelector('#' + permission + ' .remove-with-js').remove();

	  var element = document.createElement('p');
	  element.textContent = 'This capability is not exposed to the browser.';
	  document
	    .getElementById(permission)
	    .appendChild(element);
	});
      });
  }

  function handleMotion (event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

    document.querySelector('#device-motion .deprecated').remove();
    var element = document.createElement('p');
    element.textContent = 'Device Motion ' + x + '/' + y + '/' + z;
    document
      .getElementById('device-motion')
      .appendChild(element);
  }

  function handleOrientation (event) {
    // Alpha: rotation around z-axis
    var rotateDegrees = event.alpha;
    // Beta: Front-back motion
    var frontToBack = event.beta;
    // Gamma: rotate left to right
    var leftToRight = event.gamma;

    var element = document.createElement('p');
    element.textContent = 'Device Orientation ' + [
      frontToBack,
      leftToRight,
      rotateDegrees
    ].join(' / ');
    document.querySelector('#device-orientation .deprecated').remove();
    document
      .getElementById('device-orientation')
      .appendChild(element)
  }

  function showPromptForPermission (permission, permissionStatus) {
    permissionStatus.onchange = function () {
      console.log('Permission for ' + permission + ' changed to ', this.state);
    }

    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = 'Ask for ' + permission + ' permission';
    document
      .getElementById(permission)
      .appendChild(button)
  }
})();
