.. _about:

******************
1. About Stormpath
******************

In this "About" section, we will discuss some general topics about both Stormpath and the Stormpath data model.

1.1. What is Stormpath?
=======================

Stormpath is a hosted API service for creating and managing user accounts. It is the first easy and secure user management and authentication service for developers.

Built for developers, it offers an easy API, open source SDKs, web-based administration console, and an active community. All of this for a flexible cloud service that can manage millions of users with a scalable pricing model that is ideal for projects of any size.

By offloading user management and authentication to Stormpath, developers can bring new applications to market faster, reduce development and operations costs, and protect their users with best-in-class security.

1.1.1. What you can do with Stormpath
-------------------------------------

Stormpath is used as a simple REST API, over HTTP. This means you can use Stormpath from any software environment. For instance, if you wanted to create a new user account with a given an email address and password, you could send Stormpath an HTTP POST request and Stormpath would create a new user account for you, and store it securely on Stormpath’s cloud service.

In addition to user registration and login, Stormpath can do a lot more!

- Easily implement token-based authentication.
- Provide single sign-on across your applications.
- Control of flexible and granular user authorization.
- Partition multi-tenant SaaS account data.
- Simplify social login with providers like Google and Facebook.
- Manage developer API keys and access tokens.
- Verify new users via email.
- Automatically provide secure password reset functionality.
- Centralize your user store across multiple applications.
- Plug into your favorite language or web framework.

1.1.2. Who should use Stormpath
-------------------------------

You might want to use Stormpath if:

- You want to make user creation, management, and security as simple as possible
- User security is a top priority.
- Scaling your user base is a potential problem
- You need to store custom user data along with your user’s basic information.
- You would like to have automatic email verification for new user accounts.
- You would like to configure and customize password strength rules.
- You'd like to keep your user data separate from your other applications to increase platform stability and availability.
- You are building a service-oriented application, in which multiple independent services need access to the same user data.
- You are a big organization who would like to use Stormpath, but need to host it yourself (Stormpath offers private deployments).

Basically, Stormpath is a great match for applications of any size where security, speed, and simplicity are top priorities.

1.2. The Stormpath Data Model
=============================

This section will give a high-level overview of the Stormpath data model, with more in-depth information to follow later in this guide.

Entities inside Stormpath are referred to as **resources**. Each Stormpath resource has a unique ``href`` associated with it, and contains one or more "attributes". For example, an Account resource has an ``email`` attribute, which contains the value for the email address.

When you :ref:`sign up <quickstart>` for Stormpath, a private data space is created for you, which is represented as a :ref:`ref-tenant` resource in the Stormpath REST API. As a Stormpath customer, you own your Tenant resource and everything in it – Applications, Directories, Accounts, Groups, and so on.

An :ref:`ref-application` resource in Stormpath contains information about any real-world software that communicates with Stormpath via REST APIs.

A top-level container resource for your user base is a :ref:`ref-directory`. Directories can either be hosted inside Stormpath, or can be used to replicate outside user directories, as in the case of Active Directory or Facebook. Security policies, like password strength, are defined on a Directory level. An Application can access multiple Directories, and multiple Applications can also access the same Directory.

Users are modeled inside Stormpath as :ref:`ref-account`. Every Account is unique within a Directory, with this uniqueness usually tied to an email address.

A :ref:`ref-group` is made up of Accounts found within a Directory. It can be thought of as a label applied to a set of Accounts.

The relation between every Account and its Group is contained in a :ref:`ref-groupmembership` resource. If you imagine Groups as labels for Accounts, the Group Membership object contains information about which labels have been applied to which Accounts.

Both Directories and Groups are **Account Stores**, in that they both can "store" Accounts. Account Stores can be mapped to Application resources to allow your Accounts to log-in to those applications. Both Directories and Groups can in turn be contained inside an **Organization** resource, which can be used to model the tenants in a multi-tenant deployment.

A resource that contains other resources is known as a :ref:`about-collections`. Collections support additional behavior, such as pagination, sort ordering, and searching. So the "applications" resource would be a collection of Application resource ``href``.

Stormpath uses the :ref:`ref-customdata` resource to store custom information. It is a schema-less map object that is automatically created at the same time as, and linked to, another Stormpath resource, such as an Account, Group, or Directory.

For more information about all of these, please see the :ref:`reference` section.