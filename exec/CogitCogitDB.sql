-- --------------------------------------------------------
-- 호스트:                          k9a109.p.ssafy.io
-- 서버 버전:                        11.1.2-MariaDB-1:11.1.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- cogit 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `cogit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cogit`;

-- 테이블 cogit.algorithm_quest 구조 내보내기
CREATE TABLE IF NOT EXISTS `algorithm_quest` (
  `algorithm_quest_id` int(11) NOT NULL AUTO_INCREMENT,
  `algorithm_quest_number` int(11) NOT NULL,
  `algorithm_quest_platform` varchar(255) NOT NULL,
  `algorithm_quest_url` varchar(512) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  PRIMARY KEY (`algorithm_quest_id`),
  KEY `idx_algorithm_quest` (`algorithm_quest_number`,`algorithm_quest_platform`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.algorithm_quest:~12 rows (대략적) 내보내기
INSERT INTO `algorithm_quest` (`algorithm_quest_id`, `algorithm_quest_number`, `algorithm_quest_platform`, `algorithm_quest_url`, `schedule_id`) VALUES
	(1, 1008, 'BAEKJOON', 'https://www.acmicpc.net/problem/1008', 1),
	(2, 12941, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/12941', 5),
	(3, 32412, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/32412', 5),
	(4, 4221, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/4221', 5),
	(5, 20018, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/20018', 5),
	(6, 12941, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/12941', 6),
	(7, 32412, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/32412', 6),
	(8, 4221, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/4221', 6),
	(9, 20018, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/20018', 6),
	(11, 181188, 'PROGRAMMERS', 'https://school.programmers.co.kr/learn/courses/30/lessons/181188', 8),
	(12, 1018, 'BAEKJOON', 'https://www.acmicpc.net/problem/1018', 8),
	(13, 1074, 'BAEKJOON', 'https://www.acmicpc.net/problem/1074', 2);

-- 테이블 cogit.code 구조 내보내기
CREATE TABLE IF NOT EXISTS `code` (
  `code_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `code_analyze` varchar(255) NOT NULL,
  `code_content` text NOT NULL,
  `code_file_extension` varchar(255) NOT NULL,
  `code_running_time` float NOT NULL,
  `code_solved` bit(1) NOT NULL,
  `code_uuid` varchar(255) NOT NULL,
  `language` varchar(20) NOT NULL,
  `algorithm_quest_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`code_id`),
  KEY `idx_member_algorithm_quest` (`algorithm_quest_id`,`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.code:~6 rows (대략적) 내보내기
INSERT INTO `code` (`code_id`, `created_at`, `updated_at`, `code_analyze`, `code_content`, `code_file_extension`, `code_running_time`, `code_solved`, `code_uuid`, `language`, `algorithm_quest_id`, `member_id`) VALUES
	(1, '2023-11-13 05:39:29', '2023-11-13 05:39:29', 'https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects', 'a, b = map(int, input().split())\nprint(a/b)', 'py', 52, b'1', 'cc77d757-093d-4cb3-9ed6-406c0211ef2a', 'py', 1, 71054445),
	(2, '2023-11-13 05:58:45', '2023-11-13 05:58:45', 'https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects', 'a, b = map(int, input().split())\nprint(a/b)', 'py', 40, b'1', '4917d12c-1877-4a55-a295-8d14a669bf7e', 'py', 1, 71054445),
	(3, '2023-11-13 08:43:33', '2023-11-13 08:43:33', 'https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects', 'a, b = map(int, input().split())\nprint(a/b)', 'py', 44, b'1', 'fbf96470-af56-4ae5-be2b-9dc9c6cbb262', 'py', 1, 71054445),
	(4, '2023-11-14 01:42:32', '2023-11-14 01:42:32', 'https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects', 'import java.util.*;\n​\nclass Solution {\n    public int solution(int[][] targets) {\n        int answer = 0;\n        Arrays.sort(targets, (o1, o2) -> {\n            if(o1[0] == o2[0]){\n                return o2[1] - o1[1];\n            }\n            return o1[0] - o2[0];\n        });\n        \n        for(int i = 0; i < targets.length; i++){\n            int end = targets[i][1];\n            \n            while(i < targets.length - 1 && targets[i + 1][0] < end){\n                end = Math.min(end, targets[i + 1][1]);\n                i++;\n            }\n            answer++;\n        }\n        return answer;\n    }\n}', 'java', 166.65, b'1', 'bdd1d8d2-58b5-4c49-8c7d-3ef02a7fc99d', 'Java', 11, 57997390),
	(5, '2023-11-14 01:43:42', '2023-11-14 01:43:42', 'https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects', 'import java.io.*;\nimport java.util.*;\n​\npublic class Main {\n    public static boolean[][] chess;\n    public static int check(boolean first , int x, int y) {\n        int res = 0;\n        for(int i = x; i<x+8; i++) {\n            for(int j = y; j<y+8; j++) {\n                if(chess[i][j]!=first) {\n                    res++;\n                }\n                first = !first; \n            }\n            first = !first;\n        }\n        return res;\n    }\n    \n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        StringTokenizer st = new StringTokenizer(br.readLine());\n        \n        int N = Integer.parseInt(st.nextToken());\n        int M = Integer.parseInt(st.nextToken());\n        chess = new boolean [N][M];\n        int answer = 64;\n        \n        for (int i = 0; i < N; i++) {\n            String str = br.readLine();\n            for(int j = 0; j<M; j++) {\n                if(str.charAt(j) == \'B\') {\n                    chess[i][j] = true;\n                }\n            }\n        }\n        \n        for(int i = 0; i<N-7; i++) {\n            for(int j = 0; j<M-7; j++) {\n                int min = Math.min(check(true, i, j), check(false, i, j));\n                answer = Math.min(min, answer);\n            }\n        }\n        System.out.println(answer);\n    }\n}', 'java', 84, b'1', 'bbbce107-bbf5-4014-8f78-30bc81be2bb3', 'Java', 12, 57997390),
	(6, '2023-11-14 06:36:35', '2023-11-14 06:36:35', 'https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects', 'import java.util.Scanner;\n​\npublic class Main {\n    static int r,c;\n​\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        r = sc.nextInt();\n        c = sc.nextInt();\n        System.out.println(findNum((int)Math.pow(2, N),0,0,0));\n    }\n    \n    private static int findNum(int len, int x, int y,int sum) {\n        int mid = len/2;\n        if(mid==0) {\n            return sum;\n        }\n        if(r<x+mid&&c<y+mid) {\n            return findNum(mid,x,y,sum);\n        }else if(r<x+mid && c>=y+mid) {\n            return findNum(mid, x,y+mid, sum+mid*mid);\n        }else if(r>=x+mid&&c<y+mid) {\n            return findNum(mid, x+mid,y,sum+mid*mid*2);\n        }else {\n            return findNum(mid, x+mid,y+mid,sum+mid*mid*3);\n        }\n        \n    }\n​\n}', 'java', 208, b'1', '8b3028e2-b9c1-40cf-a056-df0707a72640', 'Java', 13, 73926352);

-- 테이블 cogit.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `comment_content` varchar(512) NOT NULL,
  `comment_line_number` int(11) NOT NULL,
  `code_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `idx_code_member` (`code_id`,`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.comment:~0 rows (대략적) 내보내기

-- 테이블 cogit.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `member_id` int(11) NOT NULL,
  `member_git_access_token` varchar(255) DEFAULT NULL,
  `member_git_url` varchar(320) NOT NULL,
  `member_name` varchar(20) NOT NULL,
  `member_nickname` varchar(20) NOT NULL,
  `member_profile_image` varchar(255) DEFAULT NULL,
  `member_refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.member:~6 rows (대략적) 내보내기
INSERT INTO `member` (`member_id`, `member_git_access_token`, `member_git_url`, `member_name`, `member_nickname`, `member_profile_image`, `member_refresh_token`) VALUES
	(57997390, '', 'https://github.com/wancern', 'wancern', 'wancern', 'https://avatars.githubusercontent.com/u/57997390?v=4', ''),
	(66672464, '', 'https://github.com/tjdwnsmm', 'tjdwnsmm', 'tjdwnsmm', 'https://avatars.githubusercontent.com/u/66672464?v=4', ''),
	(68889383, '', 'https://github.com/jeno8522', 'jeno8522', 'jeno8522', 'https://avatars.githubusercontent.com/u/68889383?v=4', ''),
	(71054445, '', 'https://github.com/hyuntall', 'hyuntall', 'hyuntall', 'https://avatars.githubusercontent.com/u/71054445?v=4', ''),
	(73926352, '', 'https://github.com/kodms08', 'kodms08', 'kodms08', 'https://avatars.githubusercontent.com/u/73926352?v=4', ''),
	(122508599, '', 'https://github.com/wpwjd9', 'wpwjd9', 'wpwjd9', 'https://avatars.githubusercontent.com/u/122508599?v=4', '');

-- 테이블 cogit.member_algorithm_quest 구조 내보내기
CREATE TABLE IF NOT EXISTS `member_algorithm_quest` (
  `member_algorithm_quest_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_algorithm_quest_solved` bit(1) NOT NULL,
  `algorithm_quest_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`member_algorithm_quest_id`),
  KEY `idx_member_algorithm_quest` (`member_id`,`algorithm_quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.member_algorithm_quest:~24 rows (대략적) 내보내기
INSERT INTO `member_algorithm_quest` (`member_algorithm_quest_id`, `member_algorithm_quest_solved`, `algorithm_quest_id`, `member_id`) VALUES
	(1, b'1', 1, 71054445),
	(2, b'0', 2, 71054445),
	(3, b'0', 3, 71054445),
	(4, b'0', 4, 71054445),
	(5, b'0', 5, 71054445),
	(6, b'0', 6, 66672464),
	(7, b'0', 6, 71054445),
	(8, b'0', 6, 73926352),
	(9, b'0', 6, 122508599),
	(10, b'0', 7, 66672464),
	(11, b'0', 7, 71054445),
	(12, b'0', 7, 73926352),
	(13, b'0', 7, 122508599),
	(14, b'0', 8, 66672464),
	(15, b'0', 8, 71054445),
	(16, b'0', 8, 73926352),
	(17, b'0', 8, 122508599),
	(18, b'0', 9, 66672464),
	(19, b'0', 9, 71054445),
	(20, b'0', 9, 73926352),
	(21, b'0', 9, 122508599),
	(22, b'1', 11, 57997390),
	(23, b'1', 12, 57997390),
	(24, b'1', 13, 73926352);

-- 테이블 cogit.member_team 구조 내보내기
CREATE TABLE IF NOT EXISTS `member_team` (
  `member_team_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_team_quest_count` int(11) NOT NULL,
  `member_team_rank_time` int(11) NOT NULL,
  `member_team_role` varchar(255) DEFAULT NULL,
  `member_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`member_team_id`),
  KEY `idx_member_team` (`member_id`,`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.member_team:~10 rows (대략적) 내보내기
INSERT INTO `member_team` (`member_team_id`, `member_team_quest_count`, `member_team_rank_time`, `member_team_role`, `member_id`, `team_id`) VALUES
	(1, 0, 0, 'LEADER', 71054445, 1),
	(2, 0, 0, 'LEADER', 73926352, 2),
	(3, 0, 0, 'LEADER', 122508599, 3),
	(4, 0, 0, 'LEADER', 66672464, 4),
	(5, 0, 0, 'LEADER', 66672464, 5),
	(6, 0, 0, 'MEMBER', 71054445, 5),
	(7, 0, 0, 'MEMBER', 73926352, 5),
	(8, 0, 0, 'MEMBER', 122508599, 5),
	(9, 0, 0, 'LEADER', 68889383, 6),
	(10, 0, 0, 'LEADER', 57997390, 7);

-- 테이블 cogit.README 구조 내보내기
CREATE TABLE IF NOT EXISTS `README` (
  `id` int(11) NOT NULL,
  `Message` text DEFAULT NULL,
  `Bitcoin_Address` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.README:~0 rows (대략적) 내보내기
INSERT INTO `README` (`id`, `Message`, `Bitcoin_Address`) VALUES
	(1, 'I have backed up all your databases. To recover them you must pay 0.01 BTC (Bitcoin) to this address: 1KNsTnLPGGXM5YAqPXj1v8z2iFTzg5abdH . Backup List: cogit. After your payment email me at sqlrecover934@onionmail.org with your server IP (52.79.247.129) and transaction ID and you will get a download link to your backup. Emails without transaction ID and server IP will be ignored. ', '1KNsTnLPGGXM5YAqPXj1v8z2iFTzg5abdH');

-- 테이블 cogit.schedule 구조 내보내기
CREATE TABLE IF NOT EXISTS `schedule` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_end_at` date DEFAULT NULL,
  `schedule_name` varchar(50) NOT NULL,
  `schedule_start_at` date DEFAULT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.schedule:~7 rows (대략적) 내보내기
INSERT INTO `schedule` (`schedule_id`, `schedule_end_at`, `schedule_name`, `schedule_start_at`, `team_id`) VALUES
	(1, '9999-12-31', '기본 일정', '2023-11-13', 1),
	(2, '9999-12-31', '기본 일정', '2023-11-13', 2),
	(3, '9999-12-31', '기본 일정', '2023-11-13', 3),
	(4, '9999-12-31', '기본 일정', '2023-11-13', 4),
	(6, '2023-11-20', '해오세요', '2023-11-13', 5),
	(7, '9999-12-31', '기본 일정', '2023-11-13', 6),
	(8, '9999-12-31', '기본 일정', '2023-11-14', 7);

-- 테이블 cogit.schedule_algorithm_quest 구조 내보내기
CREATE TABLE IF NOT EXISTS `schedule_algorithm_quest` (
  `schedule_problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `algorithm_quest_id` int(11) NOT NULL,
  `algorithm_quest_platform` varchar(255) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  PRIMARY KEY (`schedule_problem_id`),
  KEY `idx_schedule_algorithm_quest` (`schedule_id`,`algorithm_quest_id`,`algorithm_quest_platform`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.schedule_algorithm_quest:~3 rows (대략적) 내보내기
INSERT INTO `schedule_algorithm_quest` (`schedule_problem_id`, `algorithm_quest_id`, `algorithm_quest_platform`, `schedule_id`) VALUES
	(1, 2, 'PROGRAMMERS', 6),
	(2, 3, 'PROGRAMMERS', 6),
	(3, 4, 'PROGRAMMERS', 6);

-- 테이블 cogit.team 구조 내보내기
CREATE TABLE IF NOT EXISTS `team` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(20) NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 cogit.team:~7 rows (대략적) 내보내기
INSERT INTO `team` (`team_id`, `team_name`) VALUES
	(1, 'hyuntall'),
	(2, 'kodms08'),
	(3, 'wpwjd9'),
	(4, 'tjdwnsmm'),
	(5, '달려라 하얀 백구'),
	(6, 'jeno8522'),
	(7, 'wancern');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
