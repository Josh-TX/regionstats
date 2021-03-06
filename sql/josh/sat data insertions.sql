-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2017 at 04:00 PM
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

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`id`, `sub_id`, `name`) VALUES
(1, 3, 'Male'),
(2, 3, 'Male'),
(3, 3, 'Female');

--
-- Dumping data for table `criteria_items`
--

INSERT INTO `criteria_items` (`sub_id`, `criteria_id`, `stat_id`) VALUES
(3, 2, 5),
(3, 2, 6),
(3, 2, 7),
(3, 2, 8),
(3, 3, 9),
(3, 3, 10),
(3, 3, 11),
(3, 3, 12);

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`sub_id`, `stat_id`, `region_id`, `val`) VALUES
(3, 1, 201, 2929),
(3, 2, 201, 545),
(3, 3, 201, 538),
(3, 4, 201, 533),
(3, 5, 201, 1253),
(3, 6, 201, 559),
(3, 7, 201, 569),
(3, 8, 201, 535),
(3, 9, 201, 1676),
(3, 10, 201, 535),
(3, 11, 201, 514),
(3, 12, 201, 532),
(3, 1, 202, 3799),
(3, 2, 202, 509),
(3, 3, 202, 503),
(3, 4, 202, 482),
(3, 5, 202, 1637),
(3, 6, 202, 512),
(3, 7, 202, 521),
(3, 8, 202, 473),
(3, 9, 202, 2162),
(3, 10, 202, 507),
(3, 11, 202, 490),
(3, 12, 202, 490),
(3, 1, 203, 21545),
(3, 2, 203, 523),
(3, 3, 203, 527),
(3, 4, 203, 502),
(3, 5, 203, 9531),
(3, 6, 203, 529),
(3, 7, 203, 548),
(3, 8, 203, 497),
(3, 9, 203, 12014),
(3, 10, 203, 518),
(3, 11, 203, 510),
(3, 12, 203, 506),
(3, 1, 204, 1207),
(3, 2, 204, 568),
(3, 3, 204, 569),
(3, 4, 204, 551),
(3, 5, 204, 523),
(3, 6, 204, 576),
(3, 7, 204, 593),
(3, 8, 204, 546),
(3, 9, 204, 684),
(3, 10, 204, 562),
(3, 11, 204, 551),
(3, 12, 204, 555),
(3, 1, 205, 241553),
(3, 2, 205, 495),
(3, 3, 205, 506),
(3, 4, 205, 491),
(3, 5, 205, 108336),
(3, 6, 205, 502),
(3, 7, 205, 527),
(3, 8, 205, 489),
(3, 9, 205, 133217),
(3, 10, 205, 490),
(3, 11, 205, 488),
(3, 12, 205, 493),
(3, 1, 206, 6485),
(3, 2, 206, 582),
(3, 3, 206, 587),
(3, 4, 206, 567),
(3, 5, 206, 2914),
(3, 6, 206, 585),
(3, 7, 206, 607),
(3, 8, 206, 559),
(3, 9, 206, 3571),
(3, 10, 206, 580),
(3, 11, 206, 570),
(3, 12, 206, 573),
(3, 1, 207, 36445),
(3, 2, 207, 504),
(3, 3, 207, 506),
(3, 4, 207, 504),
(3, 5, 207, 17554),
(3, 6, 207, 505),
(3, 7, 207, 520),
(3, 8, 207, 496),
(3, 9, 207, 18891),
(3, 10, 207, 503),
(3, 11, 207, 492),
(3, 12, 207, 511),
(3, 1, 208, 9823),
(3, 2, 208, 462),
(3, 3, 208, 461),
(3, 4, 208, 445),
(3, 5, 208, 4724),
(3, 6, 208, 460),
(3, 7, 208, 471),
(3, 8, 208, 434),
(3, 9, 208, 5099),
(3, 10, 208, 465),
(3, 11, 208, 453),
(3, 12, 208, 456),
(3, 1, 209, 4718),
(3, 2, 209, 441),
(3, 3, 209, 440),
(3, 4, 209, 432),
(3, 5, 209, 2330),
(3, 6, 209, 443),
(3, 7, 209, 453),
(3, 8, 209, 427),
(3, 9, 209, 2388),
(3, 10, 209, 440),
(3, 11, 209, 427),
(3, 12, 209, 437),
(3, 1, 210, 122939),
(3, 2, 210, 486),
(3, 3, 210, 480),
(3, 4, 210, 468),
(3, 5, 210, 56599),
(3, 6, 210, 486),
(3, 7, 210, 494),
(3, 8, 210, 458),
(3, 9, 210, 66340),
(3, 10, 210, 486),
(3, 11, 210, 468),
(3, 12, 210, 477),
(3, 1, 211, 72898),
(3, 2, 211, 490),
(3, 3, 211, 485),
(3, 4, 211, 475),
(3, 5, 211, 33276),
(3, 6, 211, 494),
(3, 7, 211, 501),
(3, 8, 211, 468),
(3, 9, 211, 39622),
(3, 10, 211, 486),
(3, 11, 211, 472),
(3, 12, 211, 480),
(3, 1, 212, 7888),
(3, 2, 212, 487),
(3, 3, 212, 508),
(3, 4, 212, 477),
(3, 5, 212, 3478),
(3, 6, 212, 491),
(3, 7, 212, 523),
(3, 8, 212, 471),
(3, 9, 212, 4410),
(3, 10, 212, 483),
(3, 11, 212, 495),
(3, 12, 212, 482),
(3, 1, 213, 17695),
(3, 2, 213, 467),
(3, 3, 213, 463),
(3, 4, 213, 442),
(3, 5, 213, 8899),
(3, 6, 213, 463),
(3, 7, 213, 472),
(3, 8, 213, 428),
(3, 9, 213, 8796),
(3, 10, 213, 472),
(3, 11, 213, 454),
(3, 12, 213, 457),
(3, 1, 214, 5728),
(3, 2, 214, 599),
(3, 3, 214, 616),
(3, 4, 214, 587),
(3, 5, 214, 2770),
(3, 6, 214, 603),
(3, 7, 214, 635),
(3, 8, 214, 583),
(3, 9, 214, 2958),
(3, 10, 214, 595),
(3, 11, 214, 598),
(3, 12, 214, 591),
(3, 1, 215, 47548),
(3, 2, 215, 496),
(3, 3, 215, 499),
(3, 4, 215, 478),
(3, 5, 215, 21119),
(3, 6, 215, 503),
(3, 7, 215, 519),
(3, 8, 215, 473),
(3, 9, 215, 26429),
(3, 10, 215, 490),
(3, 11, 215, 483),
(3, 12, 215, 482),
(3, 1, 216, 986),
(3, 2, 216, 589),
(3, 3, 216, 600),
(3, 4, 216, 566),
(3, 5, 216, 440),
(3, 6, 216, 594),
(3, 7, 216, 622),
(3, 8, 216, 562),
(3, 9, 216, 546),
(3, 10, 216, 586),
(3, 11, 216, 582),
(3, 12, 216, 569),
(3, 1, 217, 1528),
(3, 2, 217, 588),
(3, 3, 217, 592),
(3, 4, 217, 568),
(3, 5, 217, 704),
(3, 6, 217, 596),
(3, 7, 217, 618),
(3, 8, 217, 569),
(3, 9, 217, 824),
(3, 10, 217, 581),
(3, 11, 217, 571),
(3, 12, 217, 568),
(3, 1, 218, 1731),
(3, 2, 218, 588),
(3, 3, 218, 587),
(3, 4, 218, 574),
(3, 5, 218, 834),
(3, 6, 218, 593),
(3, 7, 218, 612),
(3, 8, 218, 572),
(3, 9, 218, 897),
(3, 10, 218, 583),
(3, 11, 218, 565),
(3, 12, 218, 576),
(3, 1, 219, 1976),
(3, 2, 219, 563),
(3, 3, 219, 559),
(3, 4, 219, 553),
(3, 5, 219, 905),
(3, 6, 219, 578),
(3, 7, 219, 586),
(3, 8, 219, 558),
(3, 9, 219, 1071),
(3, 10, 219, 551),
(3, 11, 219, 537),
(3, 12, 219, 549),
(3, 1, 220, 13936),
(3, 2, 220, 468),
(3, 3, 220, 473),
(3, 4, 220, 451),
(3, 5, 220, 7157),
(3, 6, 220, 461),
(3, 7, 220, 479),
(3, 8, 220, 435),
(3, 9, 220, 6779),
(3, 10, 220, 476),
(3, 11, 220, 465),
(3, 12, 220, 467),
(3, 1, 221, 48845),
(3, 2, 221, 491),
(3, 3, 221, 493),
(3, 4, 221, 478),
(3, 5, 221, 23014),
(3, 6, 221, 491),
(3, 7, 221, 507),
(3, 8, 221, 470),
(3, 9, 221, 25831),
(3, 10, 221, 490),
(3, 11, 221, 480),
(3, 12, 221, 486),
(3, 1, 222, 61277),
(3, 2, 222, 516),
(3, 3, 222, 529),
(3, 4, 222, 507),
(3, 5, 222, 29068),
(3, 6, 222, 521),
(3, 7, 222, 547),
(3, 8, 222, 503),
(3, 9, 222, 32209),
(3, 10, 222, 512),
(3, 11, 222, 514),
(3, 12, 222, 511),
(3, 1, 223, 3765),
(3, 2, 223, 594),
(3, 3, 223, 609),
(3, 4, 223, 585),
(3, 5, 223, 1769),
(3, 6, 223, 604),
(3, 7, 223, 636),
(3, 8, 223, 587),
(3, 9, 223, 1996),
(3, 10, 223, 584),
(3, 11, 223, 585),
(3, 12, 223, 583),
(3, 1, 224, 3205),
(3, 2, 224, 595),
(3, 3, 224, 607),
(3, 4, 224, 576),
(3, 5, 224, 1461),
(3, 6, 224, 597),
(3, 7, 224, 627),
(3, 8, 224, 569),
(3, 9, 224, 1744),
(3, 10, 224, 593),
(3, 11, 224, 590),
(3, 12, 224, 581),
(3, 1, 225, 858),
(3, 2, 225, 580),
(3, 3, 225, 563),
(3, 4, 225, 570),
(3, 5, 225, 371),
(3, 6, 225, 599),
(3, 7, 225, 596),
(3, 8, 225, 578),
(3, 9, 225, 487),
(3, 10, 225, 566),
(3, 11, 225, 539),
(3, 12, 225, 563),
(3, 1, 226, 2379),
(3, 2, 226, 596),
(3, 3, 226, 599),
(3, 4, 226, 582),
(3, 5, 226, 1161),
(3, 6, 226, 595),
(3, 7, 226, 613),
(3, 8, 226, 572),
(3, 9, 226, 1218),
(3, 10, 226, 597),
(3, 11, 226, 585),
(3, 12, 226, 592),
(3, 1, 227, 1362),
(3, 2, 227, 561),
(3, 3, 227, 556),
(3, 4, 227, 538),
(3, 5, 227, 591),
(3, 6, 227, 565),
(3, 7, 227, 575),
(3, 8, 227, 535),
(3, 9, 227, 771),
(3, 10, 227, 558),
(3, 11, 227, 542),
(3, 12, 227, 541),
(3, 1, 228, 723),
(3, 2, 228, 589),
(3, 3, 228, 590),
(3, 4, 228, 576),
(3, 5, 228, 317),
(3, 6, 228, 593),
(3, 7, 228, 609),
(3, 8, 228, 576),
(3, 9, 228, 406),
(3, 10, 228, 586),
(3, 11, 228, 575),
(3, 12, 228, 576),
(3, 1, 229, 11487),
(3, 2, 229, 494),
(3, 3, 229, 494),
(3, 4, 229, 470),
(3, 5, 229, 4939),
(3, 6, 229, 499),
(3, 7, 229, 513),
(3, 8, 229, 463),
(3, 9, 229, 6548),
(3, 10, 229, 490),
(3, 11, 229, 479),
(3, 12, 229, 475),
(3, 1, 230, 10738),
(3, 2, 230, 525),
(3, 3, 230, 530),
(3, 4, 230, 511),
(3, 5, 230, 5062),
(3, 6, 230, 528),
(3, 7, 230, 548),
(3, 8, 230, 504),
(3, 9, 230, 5676),
(3, 10, 230, 522),
(3, 11, 230, 514),
(3, 12, 230, 518),
(3, 1, 231, 85021),
(3, 2, 231, 500),
(3, 3, 231, 521),
(3, 4, 231, 499),
(3, 5, 231, 40745),
(3, 6, 231, 504),
(3, 7, 231, 536),
(3, 8, 231, 494),
(3, 9, 231, 44276),
(3, 10, 231, 497),
(3, 11, 231, 507),
(3, 12, 231, 504),
(3, 1, 232, 2292),
(3, 2, 232, 551),
(3, 3, 232, 544),
(3, 4, 232, 528),
(3, 5, 232, 1025),
(3, 6, 232, 557),
(3, 7, 232, 565),
(3, 8, 232, 526),
(3, 9, 232, 1267),
(3, 10, 232, 546),
(3, 11, 232, 526),
(3, 12, 232, 530),
(3, 1, 233, 153543),
(3, 2, 233, 489),
(3, 3, 233, 502),
(3, 4, 233, 478),
(3, 5, 233, 72259),
(3, 6, 233, 492),
(3, 7, 233, 517),
(3, 8, 233, 472),
(3, 9, 233, 81284),
(3, 10, 233, 486),
(3, 11, 233, 488),
(3, 12, 233, 483),
(3, 1, 234, 58022),
(3, 2, 234, 498),
(3, 3, 234, 504),
(3, 4, 234, 476),
(3, 5, 234, 25776),
(3, 6, 234, 502),
(3, 7, 234, 520),
(3, 8, 234, 470),
(3, 9, 234, 32246),
(3, 10, 234, 494),
(3, 11, 234, 491),
(3, 12, 234, 481),
(3, 1, 235, 134),
(3, 2, 235, 597),
(3, 3, 235, 608),
(3, 4, 235, 586),
(3, 5, 235, 61),
(3, 6, 235, 606),
(3, 7, 235, 630),
(3, 8, 235, 586),
(3, 9, 235, 73),
(3, 10, 235, 590),
(3, 11, 235, 589),
(3, 12, 235, 585),
(3, 1, 236, 17253),
(3, 2, 236, 557),
(3, 3, 236, 563),
(3, 4, 236, 537),
(3, 5, 236, 8202),
(3, 6, 236, 564),
(3, 7, 236, 583),
(3, 8, 236, 535),
(3, 9, 236, 9051),
(3, 10, 236, 550),
(3, 11, 236, 545),
(3, 12, 236, 539),
(3, 1, 237, 1720),
(3, 2, 237, 576),
(3, 3, 237, 569),
(3, 4, 237, 548),
(3, 5, 237, 831),
(3, 6, 237, 583),
(3, 7, 237, 589),
(3, 8, 237, 543),
(3, 9, 237, 889),
(3, 10, 237, 569),
(3, 11, 237, 551),
(3, 12, 237, 552),
(3, 1, 238, 17405),
(3, 2, 238, 523),
(3, 3, 238, 521),
(3, 4, 238, 502),
(3, 5, 238, 7627),
(3, 6, 238, 531),
(3, 7, 238, 543),
(3, 8, 238, 497),
(3, 9, 238, 9778),
(3, 10, 238, 518),
(3, 11, 238, 503),
(3, 12, 238, 506),
(3, 1, 239, 96826),
(3, 2, 239, 499),
(3, 3, 239, 504),
(3, 4, 239, 482),
(3, 5, 239, 44607),
(3, 6, 239, 504),
(3, 7, 239, 521),
(3, 8, 239, 477),
(3, 9, 239, 52219),
(3, 10, 239, 494),
(3, 11, 239, 489),
(3, 12, 239, 486),
(3, 1, 240, 3416),
(3, 2, 240, 463),
(3, 3, 240, 450),
(3, 4, 240, 450),
(3, 5, 240, 1718),
(3, 6, 240, 457),
(3, 7, 240, 457),
(3, 8, 240, 437),
(3, 9, 240, 1698),
(3, 10, 240, 468),
(3, 11, 240, 443),
(3, 12, 240, 463),
(3, 1, 241, 8103),
(3, 2, 241, 494),
(3, 3, 241, 494),
(3, 4, 241, 484),
(3, 5, 241, 3727),
(3, 6, 241, 497),
(3, 7, 241, 509),
(3, 8, 241, 477),
(3, 9, 241, 4376),
(3, 10, 241, 491),
(3, 11, 241, 481),
(3, 12, 241, 489),
(3, 1, 242, 26336),
(3, 2, 242, 488),
(3, 3, 242, 487),
(3, 4, 242, 467),
(3, 5, 242, 11885),
(3, 6, 242, 492),
(3, 7, 242, 503),
(3, 8, 242, 458),
(3, 9, 242, 14451),
(3, 10, 242, 485),
(3, 11, 242, 473),
(3, 12, 242, 474),
(3, 1, 243, 238),
(3, 2, 243, 592),
(3, 3, 243, 597),
(3, 4, 243, 564),
(3, 5, 243, 109),
(3, 6, 243, 602),
(3, 7, 243, 623),
(3, 8, 243, 566),
(3, 9, 243, 129),
(3, 10, 243, 584),
(3, 11, 243, 575),
(3, 12, 243, 562),
(3, 1, 244, 4497),
(3, 2, 244, 581),
(3, 3, 244, 574),
(3, 4, 244, 568),
(3, 5, 244, 2226),
(3, 6, 244, 586),
(3, 7, 244, 592),
(3, 8, 244, 564),
(3, 9, 244, 2271),
(3, 10, 244, 576),
(3, 11, 244, 556),
(3, 12, 244, 572),
(3, 1, 245, 193768),
(3, 2, 245, 470),
(3, 3, 245, 486),
(3, 4, 245, 454),
(3, 5, 245, 90015),
(3, 6, 245, 472),
(3, 7, 245, 500),
(3, 8, 245, 448),
(3, 9, 245, 103753),
(3, 10, 245, 468),
(3, 11, 245, 474),
(3, 12, 245, 459),
(3, 1, 246, 1527),
(3, 2, 246, 579),
(3, 3, 246, 575),
(3, 4, 246, 554),
(3, 5, 246, 744),
(3, 6, 246, 590),
(3, 7, 246, 601),
(3, 8, 246, 555),
(3, 9, 246, 783),
(3, 10, 246, 568),
(3, 11, 246, 550),
(3, 12, 246, 553),
(3, 1, 247, 4564),
(3, 2, 247, 523),
(3, 3, 247, 524),
(3, 4, 247, 507),
(3, 5, 247, 2119),
(3, 6, 247, 524),
(3, 7, 247, 539),
(3, 8, 247, 499),
(3, 9, 247, 2445),
(3, 10, 247, 521),
(3, 11, 247, 510),
(3, 12, 247, 515),
(3, 1, 248, 59621),
(3, 2, 248, 518),
(3, 3, 248, 516),
(3, 4, 248, 499),
(3, 5, 248, 27856),
(3, 6, 248, 521),
(3, 7, 248, 532),
(3, 8, 248, 491),
(3, 9, 248, 31765),
(3, 10, 248, 516),
(3, 11, 248, 502),
(3, 12, 248, 506),
(3, 1, 249, 44423),
(3, 2, 249, 502),
(3, 3, 249, 510),
(3, 4, 249, 484),
(3, 5, 249, 20769),
(3, 6, 249, 503),
(3, 7, 249, 525),
(3, 8, 249, 474),
(3, 9, 249, 23654),
(3, 10, 249, 502),
(3, 11, 249, 498),
(3, 12, 249, 492),
(3, 1, 250, 2501),
(3, 2, 250, 509),
(3, 3, 250, 497),
(3, 4, 250, 495),
(3, 5, 250, 1050),
(3, 6, 250, 512),
(3, 7, 250, 513),
(3, 8, 250, 486),
(3, 9, 250, 1451),
(3, 10, 250, 506),
(3, 11, 250, 487),
(3, 12, 250, 503),
(3, 1, 251, 2277),
(3, 2, 251, 591),
(3, 3, 251, 605),
(3, 4, 251, 575),
(3, 5, 251, 1058),
(3, 6, 251, 597),
(3, 7, 251, 627),
(3, 8, 251, 572),
(3, 9, 251, 1219),
(3, 10, 251, 586),
(3, 11, 251, 585),
(3, 12, 251, 577),
(3, 1, 252, 181),
(3, 2, 252, 589),
(3, 3, 252, 586),
(3, 4, 252, 562),
(3, 5, 252, 83),
(3, 6, 252, 582),
(3, 7, 252, 604),
(3, 8, 252, 554),
(3, 9, 252, 98),
(3, 10, 252, 595),
(3, 11, 252, 571),
(3, 12, 252, 569);

--
-- Dumping data for table `regions`
--

INSERT INTO `stats` (`id`, `sub_id`, `title_id`, `source_id`, `year`) VALUES
(1, 3, 1, 0, 2015),
(2, 3, 2, 0, 2015),
(3, 3, 3, 0, 2015),
(4, 3, 4, 0, 2015),
(5, 3, 5, 0, 2015),
(6, 3, 6, 0, 2015),
(7, 3, 7, 0, 2015),
(8, 3, 8, 0, 2015),
(9, 3, 9, 0, 2015),
(10, 3, 10, 0, 2015),
(11, 3, 11, 0, 2015),
(12, 3, 12, 0, 2015);

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `user_id`, `admin_id`, `date_sub`, `date_mod`, `date_eval`, `type`, `status`, `notes`) VALUES
(3, 1, 1, '2017-02-07 08:40:44', '0000-00-00 00:00:00', '2017-02-07 08:57:56', 'd', 'a', '');

--
-- Dumping data for table `sub_data`
--


--
-- Dumping data for table `sub_stats`
--

INSERT INTO `sub_stats` (`id`, `sub_id`, `source_id`, `category_id`, `year`, `title`, `criteria`) VALUES
(1, 3, 0, 4, 2015, 'Test Takers', '[]'),
(2, 3, 0, 4, 2015, 'SAT Critical Reading Scores', '[]'),
(3, 3, 0, 4, 2015, 'SAT Mathematics Scores', '[]'),
(4, 3, 0, 4, 2015, 'SAT Writing Scores', '[]'),
(5, 3, 0, 4, 2015, 'Test Takers', '["Male"]'),
(6, 3, 0, 4, 2015, 'SAT Critical Reading Scores', '["Male"]'),
(7, 3, 0, 4, 2015, 'SAT Mathematics Scores', '["Male"]'),
(8, 3, 0, 4, 2015, 'SAT Writing Scores', '["Male"]'),
(9, 3, 0, 4, 2015, 'Test Takers', '["Female"]'),
(10, 3, 0, 4, 2015, 'SAT Critical Reading Scores', '["Female"]'),
(11, 3, 0, 4, 2015, 'SAT Mathematics Scores', '["Female"]'),
(12, 3, 0, 4, 2015, 'SAT Writing Scores', '["Female"]');

--
-- Dumping data for table `titles`
--

INSERT INTO `titles` (`id`, `sub_id`, `category_id`, `name`) VALUES
(1, 3, 4, 'Test Takers'),
(2, 3, 4, 'SAT Critical Reading Scores'),
(3, 3, 4, 'SAT Mathematics Scores'),
(4, 3, 4, 'SAT Writing Scores'),
(5, 3, 4, 'Test Takers'),
(6, 3, 4, 'SAT Critical Reading Scores'),
(7, 3, 4, 'SAT Mathematics Scores'),
(8, 3, 4, 'SAT Writing Scores'),
(9, 3, 4, 'Test Takers'),
(10, 3, 4, 'SAT Critical Reading Scores'),
(11, 3, 4, 'SAT Mathematics Scores'),
(12, 3, 4, 'SAT Writing Scores');

--
-- Dumping data for table `users`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
