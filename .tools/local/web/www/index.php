<?php
/**
 * @package    Joomla E2E Test Suite
 * 
 * @author     Charvi Mehra <https://github.com/charvimehradu>, Martina Scholz <https://github.com/LadySolveig>
 * 
 * @copyright  (C) 2023-2024 Open Source Matters, Inc. <http://www.joomla.org>
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
 
?>
<html>
<head>
	<style>
		body {
			max-width: 1000px;
			margin-right: auto;
			margin-left: auto;
		}
	</style>
</head>
<body>
<h1>Welcome to Joomla E2E Test Suite</h1>
<p>More information can be found on <a href="https://github.com/joomla-projects/release-testing">Github</a>.</p>
<p>Here is the list of available sites:</p>
<ul>
	<p><a href="//<?php echo $_SERVER['SERVER_NAME']; ?>:81">PHPMyAdmin installation</a></p>
	<!-- <p><a href="//<?php // echo $_SERVER['SERVER_NAME']; ?>:83">Mailcatcher installation</a></p> -->
	<p><a href="//<?php echo $_SERVER['SERVER_NAME']; ?>:5800/vnc.html?autoconnect=true">Cypress installation</a></p>
	<!-- TODO: List Sites dyanmically -->
</ul>
</body>
</html>
