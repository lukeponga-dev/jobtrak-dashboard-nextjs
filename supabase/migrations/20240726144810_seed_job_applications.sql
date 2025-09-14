-- This is a placeholder for a real user ID when auth is implemented.
-- For now, we'll use a fixed UUID for the fake user.
-- You can generate a new one using a UUID generator if you wish.
-- This ensures that RLS policies will work for unauthenticated local development.
insert into auth.users (id, aud, role) values ('00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated') on conflict (id) do nothing;


insert into public.job_applications (user_id, company, role, date, status, notes) values
('00000000-0000-0000-0000-000000000000', 'TELUS Digital - New Zealand', 'Media Search Analyst', '2025-08-27T00:00:00.000Z', 'Applied', '(Location not specified)'),
('00000000-0000-0000-0000-000000000000', 'Endace Technology Ltd', 'Endace Summer Internship Program', '2025-08-30T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato'),
('00000000-0000-0000-0000-000000000000', 'JB Hi Fi Group Pty Ltd', 'Christmas Casual', '2025-08-10T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato. Visited employer''s application site Ur Indeed'),
('00000000-0000-0000-0000-000000000000', 'Geeks on Wheels', 'Red Cross Shop Volunteer - Frankton Village Shop', '2025-08-31T00:00:00.000Z', 'Applied', 'Te Rapa, Waikato. Visited employer''s application site / Expired'),
('00000000-0000-0000-0000-000000000000', 'Hamilton City Council', 'Application Support Analyst', '2025-09-03T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato'),
('00000000-0000-0000-0000-000000000000', 'New World', 'Part time Supermarket Assistant', '2025-08-11T00:00:00.000Z', 'Rejected', 'Hamilton Central, Waikato. Unlikely to progress'),
('00000000-0000-0000-0000-000000000000', 'Houston Technology', 'Helpdesk Engineer', '2025-08-08T00:00:00.000Z', 'Rejected', 'Te Rapa, Waikato. Visited employer''s application site / Expired'),
('00000000-0000-0000-0000-000000000000', 'Heathcote Appliances', 'Online Customer Service', '2025-08-13T00:00:00.000Z', 'Rejected', 'Hamilton, Waikato. Visited employer''s application site'),
('00000000-0000-0000-0000-000000000000', 'Animates', 'Sales Assistant - (Part-Time)', '2025-08-12T00:00:00.000Z', 'Rejected', 'Rotorua, Bay of Plenty'),
('00000000-0000-0000-0000-000000000000', 'NZ Document Exchange', 'Mail sorter', '2025-08-28T00:00:00.000Z', 'Applied', 'Melville, Waikato. Visited employer''s application site / Expired'),
('00000000-0000-0000-0000-000000000000', 'Geeks on Wheels', 'Mobile PC Technician and Consultant', '2025-08-30T00:00:00.000Z', 'Applied', 'Te Rapa, Waikato. Unlikely to progress'),
('00000000-0000-0000-0000-000000000000', 'The Warehouse Group', 'Customer Care Specialist', '2025-08-14T00:00:00.000Z', 'Rejected', 'Auckland'),
('00000000-0000-0000-0000-000000000000', 'Windsor Industries', 'Warehouse Storeperson / Delivery Driver', '2025-08-17T00:00:00.000Z', 'Rejected', 'https://nz.indeed.com/viewjob?from=appsharedroid&jk=75ac032510396b1b'),
('00000000-0000-0000-0000-000000000000', 'Geeks on Wheels', 'Mobile PC Technician and Consultant', '2025-08-20T00:00:00.000Z', 'Applied', 'Hamilton, Waikato'),
('00000000-0000-0000-0000-000000000000', 'Woolworths supermarket', 'Online assistant', '2025-09-02T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato. Visited employer''s application site'),
('00000000-0000-0000-0000-000000000000', 'Kmart', 'Holiday Casual Team Member Opportunities', '2025-08-20T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato. Unlikely to progress'),
('00000000-0000-0000-0000-000000000000', 'Fujitsu Australia Limited', 'Advanced On-site Technician', '2025-08-20T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato'),
('00000000-0000-0000-0000-000000000000', 'Loadscan Limited', 'Customer and Product Support Technician', '2025-08-28T00:00:00.000Z', 'Rejected', 'Hamilton Central, Waikato. Visited employer''s application site / Expired'),
('00000000-0000-0000-0000-000000000000', 'Bridged IT Services Limited', 'IT Helpdesk Support', '2025-08-11T00:00:00.000Z', 'Applied', 'Seek'),
('00000000-0000-0000-0000-000000000000', 'EIL Global IT Solutions and Services Pvt Ltd.', 'Desktop Support Engineer', '2025-09-02T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato. Unlikely to progress / Expired'),
('00000000-0000-0000-0000-000000000000', 'Hamilton City Council', 'Kennel Attendant', '2025-08-21T00:00:00.000Z', 'Rejected', 'Hamilton Central, Waikato. Unlikely to progress'),
('00000000-0000-0000-0000-000000000000', 'Waikato Cleaning Supplies', 'Warehouse and Delivery driver', '2025-09-03T00:00:00.000Z', 'Applied', 'Hamilton Central, Waikato. Unlikely to progress'),
('00000000-0000-0000-0000-000000000000', 'Lightwire', 'Service Desk Manager', '2025-08-07T00:00:00.000Z', 'Rejected', 'Indeed'),
('00000000-0000-0000-0000-000000000000', 'Embeth', 'Call Centre Agent - Car Loans', '2025-08-27T00:00:00.000Z', 'Rejected', 'Hamilton, Waikato'),
('00000000-0000-0000-0000-000000000000', 'Hireace', 'Customer Service & Vehicle Rental Assistant', '2025-08-21T00:00:00.000Z', 'Rejected', 'Hamilton Central, Waikato'),
('00000000-0000-0000-0000-000000000000', 'The warehouse group', 'Christmas Team Member (Shopfloor/Checkout)', '2025-09-03T00:00:00.000Z', 'Applied', 'Hamilton, Waikato'),
('00000000-0000-0000-0000-000000000000', 'AKAAL INVESTMENTS LIMITED', 'Hillcrest Courier Driver', '2025-08-27T00:00:00.000Z', 'Applied', 'SEEK'),
('00000000-0000-0000-0000-000000000000', 'Scenic Hotel Group', 'Maintenance Assistant', '2025-08-27T00:00:00.000Z', 'Applied', 'SEEK'),
('00000000-0000-0000-0000-000000000000', 'PODcom Limited', 'Helpdesk Support Engineer 1', '2025-08-30T00:00:00.000Z', 'Applied', 'SEEK Online Assistant SEEK platform SEEK SEEK SEEK Expertia');
