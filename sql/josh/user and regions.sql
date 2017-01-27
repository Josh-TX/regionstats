-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2017 at 08:58 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `main`
--

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `criteria_items`
--

CREATE TABLE `criteria_items` (
  `criteria_id` mediumint(8) UNSIGNED NOT NULL,
  `stat_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `sub_id` int(10) UNSIGNED NOT NULL,
  `stat_id` bigint(20) UNSIGNED NOT NULL,
  `region_id` mediumint(10) UNSIGNED NOT NULL,
  `val` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `sub_id` int(10) UNSIGNED NOT NULL,
  `parent_id` mediumint(8) UNSIGNED NOT NULL,
  `region_type_id` tinyint(3) UNSIGNED NOT NULL,
  `data_count` int(10) UNSIGNED NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `sub_id`, `parent_id`, `region_type_id`, `data_count`, `name`) VALUES
(1, 1, 0, 1, 0, 'Abkhazia'),
(2, 1, 0, 1, 0, 'Afghanistan'),
(3, 1, 0, 1, 0, 'Albania'),
(4, 1, 0, 1, 0, 'Algeria'),
(5, 1, 0, 1, 0, 'Andorra'),
(6, 1, 0, 1, 0, 'Angola'),
(7, 1, 0, 1, 0, 'Antigua and Barbuda'),
(8, 1, 0, 1, 0, 'Argentina'),
(9, 1, 0, 1, 0, 'Armenia'),
(10, 1, 0, 1, 0, 'Australia'),
(11, 1, 0, 1, 0, 'Austria'),
(12, 1, 0, 1, 0, 'Azerbaijan'),
(13, 1, 0, 1, 0, 'Bahamas'),
(14, 1, 0, 1, 0, 'Bahrain'),
(15, 1, 0, 1, 0, 'Bangladesh'),
(16, 1, 0, 1, 0, 'Barbados'),
(17, 1, 0, 1, 0, 'Belarus'),
(18, 1, 0, 1, 0, 'Belgium'),
(19, 1, 0, 1, 0, 'Belize'),
(20, 1, 0, 1, 0, 'Benin'),
(21, 1, 0, 1, 0, 'Bhutan'),
(22, 1, 0, 1, 0, 'Bolivia'),
(23, 1, 0, 1, 0, 'Bosnia and Herzegovina'),
(24, 1, 0, 1, 0, 'Botswana'),
(25, 1, 0, 1, 0, 'Brazil'),
(26, 1, 0, 1, 0, 'Brunei'),
(27, 1, 0, 1, 0, 'Bulgaria'),
(28, 1, 0, 1, 0, 'Burkina Faso'),
(29, 1, 0, 1, 0, 'Burundi'),
(30, 1, 0, 1, 0, 'Cambodia'),
(31, 1, 0, 1, 0, 'Cameroon'),
(32, 1, 0, 1, 0, 'Canada'),
(33, 1, 0, 1, 0, 'Cape Verde'),
(34, 1, 0, 1, 0, 'Central African Republic'),
(35, 1, 0, 1, 0, 'Chad'),
(36, 1, 0, 1, 0, 'Chile'),
(37, 1, 0, 1, 0, 'China'),
(38, 1, 0, 1, 0, 'Colombia'),
(39, 1, 0, 1, 0, 'Comoros'),
(40, 1, 0, 1, 0, 'Congo, Dem. Rep. of'),
(41, 1, 0, 1, 0, 'Congo, Rep. of'),
(42, 1, 0, 1, 0, 'Cook Islands'),
(43, 1, 0, 1, 0, 'Costa Rica'),
(44, 1, 0, 1, 0, 'Croatia'),
(45, 1, 0, 1, 0, 'Cuba'),
(46, 1, 0, 1, 0, 'Cyprus'),
(47, 1, 0, 1, 0, 'Czech Republic'),
(48, 1, 0, 1, 0, 'Denmark'),
(49, 1, 0, 1, 0, 'Djibouti'),
(50, 1, 0, 1, 0, 'Dominica'),
(51, 1, 0, 1, 0, 'Dominican Republic'),
(52, 1, 0, 1, 0, 'East Timor'),
(53, 1, 0, 1, 0, 'Ecuador'),
(54, 1, 0, 1, 0, 'Egypt'),
(55, 1, 0, 1, 0, 'El Salvador'),
(56, 1, 0, 1, 0, 'Equatorial Guinea'),
(57, 1, 0, 1, 0, 'Eritrea'),
(58, 1, 0, 1, 0, 'Estonia'),
(59, 1, 0, 1, 0, 'Ethiopia'),
(60, 1, 0, 1, 0, 'Fiji'),
(61, 1, 0, 1, 0, 'Finland'),
(62, 1, 0, 1, 0, 'France'),
(63, 1, 0, 1, 0, 'Gabon'),
(64, 1, 0, 1, 0, 'Gambia'),
(65, 1, 0, 1, 0, 'Georgia'),
(66, 1, 0, 1, 0, 'Germany'),
(67, 1, 0, 1, 0, 'Ghana'),
(68, 1, 0, 1, 0, 'Greece'),
(69, 1, 0, 1, 0, 'Grenada'),
(70, 1, 0, 1, 0, 'Guatemala'),
(71, 1, 0, 1, 0, 'Guinea'),
(72, 1, 0, 1, 0, 'Guinea-Bissau'),
(73, 1, 0, 1, 0, 'Guyana'),
(74, 1, 0, 1, 0, 'Haiti'),
(75, 1, 0, 1, 0, 'Honduras'),
(76, 1, 0, 1, 0, 'Hungary'),
(77, 1, 0, 1, 0, 'Iceland'),
(78, 1, 0, 1, 0, 'India'),
(79, 1, 0, 1, 0, 'Indonesia'),
(80, 1, 0, 1, 0, 'Iran'),
(81, 1, 0, 1, 0, 'Iraq'),
(82, 1, 0, 1, 0, 'Ireland'),
(83, 1, 0, 1, 0, 'Israel'),
(84, 1, 0, 1, 0, 'Italy'),
(85, 1, 0, 1, 0, 'Ivory Coast'),
(86, 1, 0, 1, 0, 'Jamaica'),
(87, 1, 0, 1, 0, 'Japan'),
(88, 1, 0, 1, 0, 'Jordan'),
(89, 1, 0, 1, 0, 'Kazakhstan'),
(90, 1, 0, 1, 0, 'Kenya'),
(91, 1, 0, 1, 0, 'Kiribati'),
(92, 1, 0, 1, 0, 'Korea, North'),
(93, 1, 0, 1, 0, 'Korea, South'),
(94, 1, 0, 1, 0, 'Kosovo'),
(95, 1, 0, 1, 0, 'Kuwait'),
(96, 1, 0, 1, 0, 'Kyrgyzstan'),
(97, 1, 0, 1, 0, 'Laos'),
(98, 1, 0, 1, 0, 'Latvia'),
(99, 1, 0, 1, 0, 'Lebanon'),
(100, 1, 0, 1, 0, 'Lesotho'),
(101, 1, 0, 1, 0, 'Liberia'),
(102, 1, 0, 1, 0, 'Libya'),
(103, 1, 0, 1, 0, 'Liechtenstein'),
(104, 1, 0, 1, 0, 'Lithuania'),
(105, 1, 0, 1, 0, 'Luxembourg'),
(106, 1, 0, 1, 0, 'Macedonia'),
(107, 1, 0, 1, 0, 'Madagascar'),
(108, 1, 0, 1, 0, 'Malawi'),
(109, 1, 0, 1, 0, 'Malaysia'),
(110, 1, 0, 1, 0, 'Maldives'),
(111, 1, 0, 1, 0, 'Mali'),
(112, 1, 0, 1, 0, 'Malta'),
(113, 1, 0, 1, 0, 'Marshall Islands'),
(114, 1, 0, 1, 0, 'Mauritania'),
(115, 1, 0, 1, 0, 'Mauritius'),
(116, 1, 0, 1, 0, 'Mexico'),
(117, 1, 0, 1, 0, 'Micronesia'),
(118, 1, 0, 1, 0, 'Moldova'),
(119, 1, 0, 1, 0, 'Monaco'),
(120, 1, 0, 1, 0, 'Mongolia'),
(121, 1, 0, 1, 0, 'Montenegro'),
(122, 1, 0, 1, 0, 'Morocco'),
(123, 1, 0, 1, 0, 'Mozambique'),
(124, 1, 0, 1, 0, 'Myanmar'),
(125, 1, 0, 1, 0, 'Namibia'),
(126, 1, 0, 1, 0, 'Nauru'),
(127, 1, 0, 1, 0, 'Nepal'),
(128, 1, 0, 1, 0, 'Netherlands'),
(129, 1, 0, 1, 0, 'New Zealand'),
(130, 1, 0, 1, 0, 'Nicaragua'),
(131, 1, 0, 1, 0, 'Niger'),
(132, 1, 0, 1, 0, 'Nigeria'),
(133, 1, 0, 1, 0, 'Niue'),
(134, 1, 0, 1, 0, 'Norway'),
(135, 1, 0, 1, 0, 'Oman'),
(136, 1, 0, 1, 0, 'Pakistan'),
(137, 1, 0, 1, 0, 'Palau'),
(138, 1, 0, 1, 0, 'Palestine'),
(139, 1, 0, 1, 0, 'Panama'),
(140, 1, 0, 1, 0, 'Papua New Guinea'),
(141, 1, 0, 1, 0, 'Paraguay'),
(142, 1, 0, 1, 0, 'Peru'),
(143, 1, 0, 1, 0, 'Philippines'),
(144, 1, 0, 1, 0, 'Poland'),
(145, 1, 0, 1, 0, 'Portugal'),
(146, 1, 0, 1, 0, 'Qatar'),
(147, 1, 0, 1, 0, 'Romania'),
(148, 1, 0, 1, 0, 'Russia'),
(149, 1, 0, 1, 0, 'Rwanda'),
(150, 1, 0, 1, 0, 'Saint Kitts and Nevis'),
(151, 1, 0, 1, 0, 'Saint Lucia'),
(152, 1, 0, 1, 0, 'Saint Vincent and the Grenadines'),
(153, 1, 0, 1, 0, 'Samoa'),
(154, 1, 0, 1, 0, 'San Marino'),
(155, 1, 0, 1, 0, 'Saudi Arabia'),
(156, 1, 0, 1, 0, 'Senegal'),
(157, 1, 0, 1, 0, 'Serbia'),
(158, 1, 0, 1, 0, 'Seychelles'),
(159, 1, 0, 1, 0, 'Sierra Leone'),
(160, 1, 0, 1, 0, 'Singapore'),
(161, 1, 0, 1, 0, 'Slovakia'),
(162, 1, 0, 1, 0, 'Slovenia'),
(163, 1, 0, 1, 0, 'Solomon Islands'),
(164, 1, 0, 1, 0, 'Somalia'),
(165, 1, 0, 1, 0, 'South Africa'),
(166, 1, 0, 1, 0, 'South Ossetia'),
(167, 1, 0, 1, 0, 'South Sudan'),
(168, 1, 0, 1, 0, 'Spain'),
(169, 1, 0, 1, 0, 'Sri Lanka'),
(170, 1, 0, 1, 0, 'Sudan'),
(171, 1, 0, 1, 0, 'Suriname'),
(172, 1, 0, 1, 0, 'Swaziland'),
(173, 1, 0, 1, 0, 'Sweden'),
(174, 1, 0, 1, 0, 'Switzerland'),
(175, 1, 0, 1, 0, 'Syria'),
(176, 1, 0, 1, 0, 'São Tomé and Príncipe'),
(177, 1, 0, 1, 0, 'Taiwan'),
(178, 1, 0, 1, 0, 'Tajikistan'),
(179, 1, 0, 1, 0, 'Tanzania'),
(180, 1, 0, 1, 0, 'Thailand'),
(181, 1, 0, 1, 0, 'Togo'),
(182, 1, 0, 1, 0, 'Tonga'),
(183, 1, 0, 1, 0, 'Trinidad and Tobago'),
(184, 1, 0, 1, 0, 'Tunisia'),
(185, 1, 0, 1, 0, 'Turkey'),
(186, 1, 0, 1, 0, 'Turkmenistan'),
(187, 1, 0, 1, 0, 'Tuvalu'),
(188, 1, 0, 1, 0, 'Uganda'),
(189, 1, 0, 1, 0, 'Ukraine'),
(190, 1, 0, 1, 0, 'United Arab Emirates'),
(191, 1, 0, 1, 0, 'United Kingdom'),
(192, 1, 0, 1, 0, 'United States'),
(193, 1, 0, 1, 0, 'Uruguay'),
(194, 1, 0, 1, 0, 'Uzbekistan'),
(195, 1, 0, 1, 0, 'Vanuatu'),
(196, 1, 0, 1, 0, 'Venezuela'),
(197, 1, 0, 1, 0, 'Vietnam'),
(198, 1, 0, 1, 0, 'Yemen'),
(199, 1, 0, 1, 0, 'Zambia'),
(200, 1, 0, 1, 0, 'Zimbabwe'),
(201, 2, 192, 3, 0, 'Alabama'),
(202, 2, 192, 3, 0, 'Alaska'),
(203, 2, 192, 3, 0, 'Arizona'),
(204, 2, 192, 3, 0, 'Arkansas'),
(205, 2, 192, 3, 0, 'California'),
(206, 2, 192, 3, 0, 'Colorado'),
(207, 2, 192, 3, 0, 'Connecticut'),
(208, 2, 192, 3, 0, 'Delaware'),
(209, 2, 192, 3, 0, 'District of Columbia'),
(210, 2, 192, 3, 0, 'Florida'),
(211, 2, 192, 3, 0, 'Georgia'),
(212, 2, 192, 3, 0, 'Hawaii'),
(213, 2, 192, 3, 0, 'Idaho'),
(214, 2, 192, 3, 0, 'Illinois'),
(215, 2, 192, 3, 0, 'Indiana'),
(216, 2, 192, 3, 0, 'Iowa'),
(217, 2, 192, 3, 0, 'Kansas'),
(218, 2, 192, 3, 0, 'Kentucky'),
(219, 2, 192, 3, 0, 'Louisiana'),
(220, 2, 192, 3, 0, 'Maine'),
(221, 2, 192, 3, 0, 'Maryland'),
(222, 2, 192, 3, 0, 'Massachusetts'),
(223, 2, 192, 3, 0, 'Michigan'),
(224, 2, 192, 3, 0, 'Minnesota'),
(225, 2, 192, 3, 0, 'Mississippi'),
(226, 2, 192, 3, 0, 'Missouri'),
(227, 2, 192, 3, 0, 'Montana'),
(228, 2, 192, 3, 0, 'Nebraska'),
(229, 2, 192, 3, 0, 'Nevada'),
(230, 2, 192, 3, 0, 'New Hampshire'),
(231, 2, 192, 3, 0, 'New Jersey'),
(232, 2, 192, 3, 0, 'New Mexico'),
(233, 2, 192, 3, 0, 'New York'),
(234, 2, 192, 3, 0, 'North Carolina'),
(235, 2, 192, 3, 0, 'North Dakota'),
(236, 2, 192, 3, 0, 'Ohio'),
(237, 2, 192, 3, 0, 'Oklahoma'),
(238, 2, 192, 3, 0, 'Oregon'),
(239, 2, 192, 3, 0, 'Pennsylvania'),
(240, 2, 192, 3, 0, 'Puerto Rico'),
(241, 2, 192, 3, 0, 'Rhode Island'),
(242, 2, 192, 3, 0, 'South Carolina'),
(243, 2, 192, 3, 0, 'South Dakota'),
(244, 2, 192, 3, 0, 'Tennessee'),
(245, 2, 192, 3, 0, 'Texas'),
(246, 2, 192, 3, 0, 'Utah'),
(247, 2, 192, 3, 0, 'Vermont'),
(248, 2, 192, 3, 0, 'Virginia'),
(249, 2, 192, 3, 0, 'Washington'),
(250, 2, 192, 3, 0, 'West Virginia'),
(251, 2, 192, 3, 0, 'Wisconsin'),
(252, 2, 192, 3, 0, 'Wyoming');

-- --------------------------------------------------------

--
-- Table structure for table `region_groups`
--

CREATE TABLE `region_groups` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `sub_id` int(9) UNSIGNED NOT NULL,
  `region_id` mediumint(11) UNSIGNED NOT NULL,
  `region_type_id` tinyint(4) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `region_groups`
--

INSERT INTO `region_groups` (`id`, `sub_id`, `region_id`, `region_type_id`) VALUES
(1, 1, 0, 1),
(2, 2, 192, 3);

-- --------------------------------------------------------

--
-- Table structure for table `region_types`
--

CREATE TABLE `region_types` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `region_types`
--

INSERT INTO `region_types` (`id`, `name`) VALUES
(1, 'Country'),
(2, 'City'),
(3, 'State');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_id` int(10) UNSIGNED NOT NULL,
  `title_id` mediumint(8) UNSIGNED NOT NULL,
  `source_id` int(10) UNSIGNED NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `admin_id` int(10) UNSIGNED NOT NULL,
  `date_sub` datetime NOT NULL,
  `date_mod` datetime NOT NULL,
  `date_eval` datetime NOT NULL,
  `type` char(1) NOT NULL,
  `status` char(1) NOT NULL,
  `notes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `user_id`, `admin_id`, `date_sub`, `date_mod`, `date_eval`, `type`, `status`, `notes`) VALUES
(1, 9, 9, '2017-01-25 13:56:09', '0000-00-00 00:00:00', '2017-01-25 13:57:23', 'r', 'a', ''),
(2, 9, 9, '2017-01-25 13:57:53', '0000-00-00 00:00:00', '2017-01-25 13:58:08', 'r', 'a', '');

-- --------------------------------------------------------

--
-- Table structure for table `sub_data`
--

CREATE TABLE `sub_data` (
  `sub_id` int(10) UNSIGNED NOT NULL,
  `sub_stat_id` int(10) UNSIGNED NOT NULL,
  `region_id` mediumint(8) UNSIGNED NOT NULL,
  `val` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_regions`
--

CREATE TABLE `sub_regions` (
  `sub_id` int(10) UNSIGNED NOT NULL,
  `parent_id` mediumint(8) UNSIGNED NOT NULL,
  `region_type_id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_regions`
--

INSERT INTO `sub_regions` (`sub_id`, `parent_id`, `region_type_id`, `name`) VALUES
(1, 0, 1, 'Abkhazia'),
(1, 0, 1, 'Afghanistan'),
(1, 0, 1, 'Albania'),
(1, 0, 1, 'Algeria'),
(1, 0, 1, 'Andorra'),
(1, 0, 1, 'Angola'),
(1, 0, 1, 'Antigua and Barbuda'),
(1, 0, 1, 'Argentina'),
(1, 0, 1, 'Armenia'),
(1, 0, 1, 'Australia'),
(1, 0, 1, 'Austria'),
(1, 0, 1, 'Azerbaijan'),
(1, 0, 1, 'Bahamas'),
(1, 0, 1, 'Bahrain'),
(1, 0, 1, 'Bangladesh'),
(1, 0, 1, 'Barbados'),
(1, 0, 1, 'Belarus'),
(1, 0, 1, 'Belgium'),
(1, 0, 1, 'Belize'),
(1, 0, 1, 'Benin'),
(1, 0, 1, 'Bhutan'),
(1, 0, 1, 'Bolivia'),
(1, 0, 1, 'Bosnia and Herzegovina'),
(1, 0, 1, 'Botswana'),
(1, 0, 1, 'Brazil'),
(1, 0, 1, 'Brunei'),
(1, 0, 1, 'Bulgaria'),
(1, 0, 1, 'Burkina Faso'),
(1, 0, 1, 'Burundi'),
(1, 0, 1, 'Cambodia'),
(1, 0, 1, 'Cameroon'),
(1, 0, 1, 'Canada'),
(1, 0, 1, 'Cape Verde'),
(1, 0, 1, 'Central African Republic'),
(1, 0, 1, 'Chad'),
(1, 0, 1, 'Chile'),
(1, 0, 1, 'China'),
(1, 0, 1, 'Colombia'),
(1, 0, 1, 'Comoros'),
(1, 0, 1, 'Congo, Dem. Rep. of'),
(1, 0, 1, 'Congo, Rep. of'),
(1, 0, 1, 'Cook Islands'),
(1, 0, 1, 'Costa Rica'),
(1, 0, 1, 'Croatia'),
(1, 0, 1, 'Cuba'),
(1, 0, 1, 'Cyprus'),
(1, 0, 1, 'Czech Republic'),
(1, 0, 1, 'Denmark'),
(1, 0, 1, 'Djibouti'),
(1, 0, 1, 'Dominica'),
(1, 0, 1, 'Dominican Republic'),
(1, 0, 1, 'East Timor'),
(1, 0, 1, 'Ecuador'),
(1, 0, 1, 'Egypt'),
(1, 0, 1, 'El Salvador'),
(1, 0, 1, 'Equatorial Guinea'),
(1, 0, 1, 'Eritrea'),
(1, 0, 1, 'Estonia'),
(1, 0, 1, 'Ethiopia'),
(1, 0, 1, 'Fiji'),
(1, 0, 1, 'Finland'),
(1, 0, 1, 'France'),
(1, 0, 1, 'Gabon'),
(1, 0, 1, 'Gambia'),
(1, 0, 1, 'Georgia'),
(1, 0, 1, 'Germany'),
(1, 0, 1, 'Ghana'),
(1, 0, 1, 'Greece'),
(1, 0, 1, 'Grenada'),
(1, 0, 1, 'Guatemala'),
(1, 0, 1, 'Guinea'),
(1, 0, 1, 'Guinea-Bissau'),
(1, 0, 1, 'Guyana'),
(1, 0, 1, 'Haiti'),
(1, 0, 1, 'Honduras'),
(1, 0, 1, 'Hungary'),
(1, 0, 1, 'Iceland'),
(1, 0, 1, 'India'),
(1, 0, 1, 'Indonesia'),
(1, 0, 1, 'Iran'),
(1, 0, 1, 'Iraq'),
(1, 0, 1, 'Ireland'),
(1, 0, 1, 'Israel'),
(1, 0, 1, 'Italy'),
(1, 0, 1, 'Ivory Coast'),
(1, 0, 1, 'Jamaica'),
(1, 0, 1, 'Japan'),
(1, 0, 1, 'Jordan'),
(1, 0, 1, 'Kazakhstan'),
(1, 0, 1, 'Kenya'),
(1, 0, 1, 'Kiribati'),
(1, 0, 1, 'Korea, North'),
(1, 0, 1, 'Korea, South'),
(1, 0, 1, 'Kosovo'),
(1, 0, 1, 'Kuwait'),
(1, 0, 1, 'Kyrgyzstan'),
(1, 0, 1, 'Laos'),
(1, 0, 1, 'Latvia'),
(1, 0, 1, 'Lebanon'),
(1, 0, 1, 'Lesotho'),
(1, 0, 1, 'Liberia'),
(1, 0, 1, 'Libya'),
(1, 0, 1, 'Liechtenstein'),
(1, 0, 1, 'Lithuania'),
(1, 0, 1, 'Luxembourg'),
(1, 0, 1, 'Macedonia'),
(1, 0, 1, 'Madagascar'),
(1, 0, 1, 'Malawi'),
(1, 0, 1, 'Malaysia'),
(1, 0, 1, 'Maldives'),
(1, 0, 1, 'Mali'),
(1, 0, 1, 'Malta'),
(1, 0, 1, 'Marshall Islands'),
(1, 0, 1, 'Mauritania'),
(1, 0, 1, 'Mauritius'),
(1, 0, 1, 'Mexico'),
(1, 0, 1, 'Micronesia'),
(1, 0, 1, 'Moldova'),
(1, 0, 1, 'Monaco'),
(1, 0, 1, 'Mongolia'),
(1, 0, 1, 'Montenegro'),
(1, 0, 1, 'Morocco'),
(1, 0, 1, 'Mozambique'),
(1, 0, 1, 'Myanmar'),
(1, 0, 1, 'Namibia'),
(1, 0, 1, 'Nauru'),
(1, 0, 1, 'Nepal'),
(1, 0, 1, 'Netherlands'),
(1, 0, 1, 'New Zealand'),
(1, 0, 1, 'Nicaragua'),
(1, 0, 1, 'Niger'),
(1, 0, 1, 'Nigeria'),
(1, 0, 1, 'Niue'),
(1, 0, 1, 'Norway'),
(1, 0, 1, 'Oman'),
(1, 0, 1, 'Pakistan'),
(1, 0, 1, 'Palau'),
(1, 0, 1, 'Palestine'),
(1, 0, 1, 'Panama'),
(1, 0, 1, 'Papua New Guinea'),
(1, 0, 1, 'Paraguay'),
(1, 0, 1, 'Peru'),
(1, 0, 1, 'Philippines'),
(1, 0, 1, 'Poland'),
(1, 0, 1, 'Portugal'),
(1, 0, 1, 'Qatar'),
(1, 0, 1, 'Romania'),
(1, 0, 1, 'Russia'),
(1, 0, 1, 'Rwanda'),
(1, 0, 1, 'Saint Kitts and Nevis'),
(1, 0, 1, 'Saint Lucia'),
(1, 0, 1, 'Saint Vincent and the Grenadines'),
(1, 0, 1, 'Samoa'),
(1, 0, 1, 'San Marino'),
(1, 0, 1, 'Saudi Arabia'),
(1, 0, 1, 'Senegal'),
(1, 0, 1, 'Serbia'),
(1, 0, 1, 'Seychelles'),
(1, 0, 1, 'Sierra Leone'),
(1, 0, 1, 'Singapore'),
(1, 0, 1, 'Slovakia'),
(1, 0, 1, 'Slovenia'),
(1, 0, 1, 'Solomon Islands'),
(1, 0, 1, 'Somalia'),
(1, 0, 1, 'South Africa'),
(1, 0, 1, 'South Ossetia'),
(1, 0, 1, 'South Sudan'),
(1, 0, 1, 'Spain'),
(1, 0, 1, 'Sri Lanka'),
(1, 0, 1, 'Sudan'),
(1, 0, 1, 'Suriname'),
(1, 0, 1, 'Swaziland'),
(1, 0, 1, 'Sweden'),
(1, 0, 1, 'Switzerland'),
(1, 0, 1, 'Syria'),
(1, 0, 1, 'São Tomé and Príncipe'),
(1, 0, 1, 'Taiwan'),
(1, 0, 1, 'Tajikistan'),
(1, 0, 1, 'Tanzania'),
(1, 0, 1, 'Thailand'),
(1, 0, 1, 'Togo'),
(1, 0, 1, 'Tonga'),
(1, 0, 1, 'Trinidad and Tobago'),
(1, 0, 1, 'Tunisia'),
(1, 0, 1, 'Turkey'),
(1, 0, 1, 'Turkmenistan'),
(1, 0, 1, 'Tuvalu'),
(1, 0, 1, 'Uganda'),
(1, 0, 1, 'Ukraine'),
(1, 0, 1, 'United Arab Emirates'),
(1, 0, 1, 'United Kingdom'),
(1, 0, 1, 'United States'),
(1, 0, 1, 'Uruguay'),
(1, 0, 1, 'Uzbekistan'),
(1, 0, 1, 'Vanuatu'),
(1, 0, 1, 'Venezuela'),
(1, 0, 1, 'Vietnam'),
(1, 0, 1, 'Yemen'),
(1, 0, 1, 'Zambia'),
(1, 0, 1, 'Zimbabwe'),
(2, 192, 3, 'Alabama'),
(2, 192, 3, 'Alaska'),
(2, 192, 3, 'Arizona'),
(2, 192, 3, 'Arkansas'),
(2, 192, 3, 'California'),
(2, 192, 3, 'Colorado'),
(2, 192, 3, 'Connecticut'),
(2, 192, 3, 'Delaware'),
(2, 192, 3, 'District of Columbia'),
(2, 192, 3, 'Florida'),
(2, 192, 3, 'Georgia'),
(2, 192, 3, 'Hawaii'),
(2, 192, 3, 'Idaho'),
(2, 192, 3, 'Illinois'),
(2, 192, 3, 'Indiana'),
(2, 192, 3, 'Iowa'),
(2, 192, 3, 'Kansas'),
(2, 192, 3, 'Kentucky'),
(2, 192, 3, 'Louisiana'),
(2, 192, 3, 'Maine'),
(2, 192, 3, 'Maryland'),
(2, 192, 3, 'Massachusetts'),
(2, 192, 3, 'Michigan'),
(2, 192, 3, 'Minnesota'),
(2, 192, 3, 'Mississippi'),
(2, 192, 3, 'Missouri'),
(2, 192, 3, 'Montana'),
(2, 192, 3, 'Nebraska'),
(2, 192, 3, 'Nevada'),
(2, 192, 3, 'New Hampshire'),
(2, 192, 3, 'New Jersey'),
(2, 192, 3, 'New Mexico'),
(2, 192, 3, 'New York'),
(2, 192, 3, 'North Carolina'),
(2, 192, 3, 'North Dakota'),
(2, 192, 3, 'Ohio'),
(2, 192, 3, 'Oklahoma'),
(2, 192, 3, 'Oregon'),
(2, 192, 3, 'Pennsylvania'),
(2, 192, 3, 'Puerto Rico'),
(2, 192, 3, 'Rhode Island'),
(2, 192, 3, 'South Carolina'),
(2, 192, 3, 'South Dakota'),
(2, 192, 3, 'Tennessee'),
(2, 192, 3, 'Texas'),
(2, 192, 3, 'Utah'),
(2, 192, 3, 'Vermont'),
(2, 192, 3, 'Virginia'),
(2, 192, 3, 'Washington'),
(2, 192, 3, 'West Virginia'),
(2, 192, 3, 'Wisconsin'),
(2, 192, 3, 'Wyoming');

-- --------------------------------------------------------

--
-- Table structure for table `sub_sources`
--

CREATE TABLE `sub_sources` (
  `sub_id` int(10) UNSIGNED NOT NULL,
  `region_id` mediumint(8) UNSIGNED NOT NULL,
  `publisher` varchar(60) NOT NULL,
  `title` varchar(60) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_stats`
--

CREATE TABLE `sub_stats` (
  `id` int(10) UNSIGNED NOT NULL,
  `sub_id` int(10) UNSIGNED NOT NULL,
  `source_id` int(10) UNSIGNED NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `titles`
--

CREATE TABLE `titles` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `sub_id` int(10) UNSIGNED NOT NULL,
  `category_id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `admin`, `date_created`) VALUES
(9, 'josh', 'a@a.com', 'password', 10, '2017-01-25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `region_groups`
--
ALTER TABLE `region_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `region_types`
--
ALTER TABLE `region_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `titles`
--
ALTER TABLE `titles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;
--
-- AUTO_INCREMENT for table `region_groups`
--
ALTER TABLE `region_groups`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `region_types`
--
ALTER TABLE `region_types`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `titles`
--
ALTER TABLE `titles`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
