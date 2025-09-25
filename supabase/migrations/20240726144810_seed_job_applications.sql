-- This is a placeholder for a real user ID when auth is implemented.
-- For now, we'll use a fixed UUID for the fake user.
-- You can generate a new one using a UUID generator if you wish.
-- This ensures that RLS policies will work for unauthenticated local development.
insert into auth.users (id, aud, role) values ('8a3db50c-7333-41b7-b34e-4333688f77d7', 'authenticated', 'authenticated') on conflict (id) do nothing;


insert into public.job_applications (user_id, company, role, date, status, notes) values
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Waikato Cleaning Supplies', 'Warehouse and Delivery driver', '2025-09-02 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'The Warehouse Group', 'Christmas Team Member (Shop)', '2025-09-02 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Hamilton City Council', 'Application Support Analyst', '2025-09-02 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'EIL Global IT Solutions and Services Pvt Ltd.', 'Desktop Support Engineer', '2025-09-01 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Woolworths Supermarket', 'Online Assistant', '2025-09-01 12:00:00+00', 'Rejected', 'Handled customer queries online'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Geeks on Wheels', 'Red Cross Shop Volunteer - Frankton Village Shop', '2025-08-30 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Endace Technology Ltd', 'Endace Summer Internship Program', '2025-08-29 12:00:00+00', 'Rejected', 'Internship opportunity'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Loadscan Limited', 'Customer and Product Support Technician', '2025-08-27 12:00:00+00', 'Rejected', 'Received rejection email'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Embeth', 'Call Centre Agent - Car Loans', '2025-08-26 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Hamilton City Council', 'Kennel Attendant', '2025-08-20 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Hireace', 'Customer Service & Vehicle Rental Assistant', '2025-08-20 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Fujitsu Australia Limited', 'Advanced On-site Technician', '2025-08-19 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Windsor Industries', 'Warehouse Storeperson / Delivery Driver', '2025-08-16 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'The Warehouse Group', 'Customer Care Specialist', '2025-08-13 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Heathcote Appliances', 'Online Customer Service', '2025-08-12 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Animates', 'Sales Assistant - (Part-Time)', '2025-08-11 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Bridged IT Services Limited', 'IT Helpdesk Support', '2025-08-10 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'New World', 'Part time Supermarket Assistant', '2025-08-10 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'JB Hi Fi Group Pty Ltd', 'Christmas Casual', '2025-08-09 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Houston Technology', 'Helpdesk Engineer', '2025-08-07 12:00:00+00', 'Rejected', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Inghams', 'Process Worker', '2025-09-21 05:51:52.969+00', 'Applied', null),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'U-Tow New Zealand Limited', 'Customer Support Representative (Call Centre)', '2025-09-18 11:00:00+00', 'Applied', 'Option to show strong interest'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Performance Sports Limited', 'Stirling Sports Retail Assistant (Part-Time & Casual)', '2025-09-13 12:00:00+00', 'Applied', 'Strong interest shown'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'The Wash Club', 'Customer Experience & Site Crew', '2025-09-20 12:00:00+00', 'Applied', 'Option to show strong interest'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'BED BATH N\' TABLE', 'CHRISTMAS HELPERS | NZ HAMILTON', '2025-09-19 12:00:00+00', 'Applied', 'Redirected to employer site; generous discounts noted'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'MEA Mobile', 'Paid Summer Internship - Mobile/Web Development', '2025-09-20 12:00:00+00', 'Applied', 'Strong interest shown'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Dollar Dealers', 'Sales Associate - Hamilton', '2025-09-20 12:00:00+00', 'Rejected', 'Option to show strong interest'),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Hamilton hotel', 'Front of House', '2025-09-25 06:53:59.082+00', 'Applied', 'Applied on seek '),
('8a3db50c-7333-41b7-b34e-4333688f77d7', 'Spotlight Ltd', 'FIXED TERM Retail Sales Assistants ', '2025-09-23 12:00:00+00', 'Applied', '');