 .. _authz:

*******************************
5. Authorization With Stormpath
*******************************

This section will provide you with a quick introduction to Authorization with Stormpath. It begins by answering the question "What is authorization?", including the difference between simple authorization checks and permissions-based authorization. It then describes some approaches to modeling authorization in Stormpath. Those include: using the Group resource to model roles, expanding those roles to cover every tenant in your application, and finally how to create fine-grained permissions.

5.1. What is Authorization?
===========================

Authorization is simply the way in which we determine the permissions someone has to do something. In contrast to authentication, which is how we determine who a person is, **authorization** is how we determine **what a person can do**.

Once a user has entered in a valid login and password (authentication), there are the permission checks (authorization) that can be performed which dictate what access rights they have to your system resources. Going back to our airport scenario, once you have proven who you are with your passport, the airline also checks that you are permitted to board the plane by checking that you have a valid boarding pass.

One distinction, though, is whether the permission is attached to the user, or to the resource that they are accessing. To go back to our airport scenario, we can imagine the airline has two options.

5.1.1. Simple Authorization
---------------------------

First, the airline can have at the gate a master list of all passengers who are allowed to board the plane. This is equivalent to hard-coding permission checks into your application, and then tying them in some way to a user. This means that your authorization logic can be based on checks of a user's particular identity (e.g. ``if (user("jsmith") {...``) or their membership in a particular Group (e.g. ``if (user.group("passengers") {...``).  This simple authorization is perfectly sufficient for many applications, but has some downsides. One downside is that it can result in authorization rules that are more difficult to change dynamically. Another downside is that any change in authorization rules can end-up requiring a lot of refactoring of code, test cases, etc. A more dynamic and powerful way of handling authorization is through the use of permissions.

5.1.2. Permissions-based Authorization
--------------------------------------

Permissions, at their most basic, are statements of functionality that define a resource and what actions are possible for that resource. Going back to our airport scenario, an alternative to the boarding master list is that the airline sets a requirement: every passenger who wants to board the plane must bring a boarding pass. This pass comes with permission to perform the "board" action onto a specific flight number. So now, instead of basing authorization around a particular user identifier, we could require a certain permission to perform an action on a resource (e.g. ``if (user.isPermitted("flight:board:ac232"))``). This approach has many advantages, including more flexibility with regards to your security model, and separating your application logic from your data model.

.. todo::

  This could use a concrete example.

5.2. Modeling Authorization in Stormpath
========================================

From the perspective of a REST API, Stormpath only serves as the repository for authorization data. Authorization enforcement must happen on the client-side, and one of the many `Stormpath Integrations <https://docs.stormpath.com/home/>`__ can help you with this. In this section we will discuss how to model the authorization data which is extremely important to your overall security model.

.. _role-groups:

5.2.1. How to Use Groups to Model Authorization Roles
-----------------------------------------------------

The Group resource is central to many of the more advanced forms of authorization available with Stormpath. Among other things, you can use Groups for things like :ref:`modelling hierarchies <hierarchy-groups>`, as well as creating user roles that span every organization that is using your application.

As we have already said, you can think of Groups as labels applied to Accounts via the GroupMembership resource. They can be used to organize users, like having all Accounts belonging to users from Tatooine associated with a "Tatooine" user Group resource. However, much in the same way that a label can be used to define an officer's rank (and thereby what he is authorized to do), Groups can also be used to model "roles" in Stormpath for the purposes of role-based access control. If we associate an Account with a certain role Group, then that Account will have all the authorizations defined for that Group. Moreover, if an Account is associated with multiple Groups then it will inherit authorization from all of them.

Note that when we say "user Group" and "role Group" we are not discussing two different types of Group resources here, but just pointing out that the Group resource has multiple applications. So that "Tatooine" Group could be used to organize all Accounts for users residing on Tatooine, but it could also come with some sort of authorization permissions associated with it as well. A more common scenario would be having a Group called  "administrators", and that could be used to organize everyone with the permissions required for an administrator in your application.

Also roles do not require you to use permissions-based authorization. You can still include checks in your code along the lines of ``if (user.group("authRole") {...``.

Now that we have some understanding of authorization roles in Stormpath, we can discussion another powerful use of Stormpath's flexible data model.

.. _app-wide-roles:

Application-Wide Roles
^^^^^^^^^^^^^^^^^^^^^^

In a multi-tenant SaaS application, it is easy to imagine a scenario where you might want to have user Accounts segregated based upon the tenant that they belong to, while at the same time defining authorization based on broader, application-wide roles. In Stormpath, we recommended that you model every tenant that uses your Application using the **Organization** resource. The Organization resource is a container for Directory and Group resources that makes it easier to model user bases with multiple tenants. For more information about this, please see the :ref:`multi-tenancy chapter <multitenancy>`.

Alongside these Organizations and their Account Stores, it is also possible to define application-wide Groups that allow for roles that span across Organizations, regardless of which tenant a user belongs to. We can illustrate this with an example.

.. note::

  This just one possible way of modeling a multi-tenant app with application-wide roles. Your approach may vary. If you need help with modeling your user base, feel free to contact us at support@stormpath.com and we will help as best as we can.

Specifically, we will use the Tenant-per-Group example from :ref:`the Multi-tenancy chapter <multitenancy-strategies>`.

.. figure:: images/multitenancy/ERD_TpG.png
    :align: center
    :scale: 100%
    :alt: A multi-tenant implementation

    *An example multi-tenant application*

To recap: The "Lightning Banking" application must support multiple tenants for each of the bank's subsidiaries ("Bank of A", "Bank of B", etc), each modeled as an Organization resource.

Each of these Organization resources has a Group as its Account Store. This means that all of the users for that Tenant will be represented by Account resources that are mapped to that subsidiary's Organization as well as its Group.

Claire is a customer Bank of A, so her Account resource is associated with the "Bank of A" Organization and Group resources.

Now our banking application has roles that we want applied across all of its tenants, such as "User" and "Application Administrator". Modeling these can be accomplished by creating Groups for them, and then associating the appropriate Accounts with them. Voila, application-wide roles.

So Claire is a customer at the Bank of A, and is associated with the "Bank of A" tenant Group. But she is also just a regular user, so she is also associated with the "User" role Group. We have a separate user Esther, who is a customer of Bank of B. She is associated with the Bank of B tenant Group, but because she has the same role as Claire, she is associated with the same role Group.

The actual authorization checks that you do here are irrelevant, so you can still use what we have called "simple authorization" with these roles, or you can use permission-based authorization checks.

More information about the APIs that allow you to create, retrieve and search an Application's Groups can be found in the the :ref:`Account Management section <group-mgmt>`, while more information about multi-Tenancy can be found :ref:`in the multi-tenancy section <multitenancy>`.

5.2.2. Using Permissions
------------------------

If you have decided that your application requires the more advanced authorization modeling possible with permissions, then the first question with every permission is whether it will be tied to an Account or a Group.

**User-unique permissions:** Any permissions that are are unique to a user should be tied to that user's Account resource.

**Role permissions:** Permissions that will be shared among a number of users are better bundled together in roles, that is Groups, which many individual Accounts while be associated to.

The next question is: what will your permissions look like?

.. _custom-perms:

How to Model Fine-Grained Permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stormpath also gives you an enormous amount of flexibility with what these permissions look like. A permission in Stormpath can be as simple as:

.. only:: rest

  .. code-block:: json

    {
      "create_admin": "yes"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authorization/example_perm_simple.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authorization/example_perm_simple.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authorization/example_perm_simple.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authorization/example_perm_simple.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authorization/example_perm_simple.php
    :language: json

.. only:: python

  .. literalinclude:: code/python/authorization/example_perm_simple.py
    :language: json

.. only:: ruby

  .. literalinclude:: code/ruby/authorization/example_perm_simple.rb
    :language: json

Or as complex as:

.. only:: rest

  .. code-block:: json

    {
      "name": "create-admin",
      "description": "This permission allows the account to create an admin",
      "action": "read",
      "resource": "/admin/create",
      "effect": "allow"
    }

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authorization/example_perm_complex.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authorization/example_perm_complex.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authorization/example_perm_complex.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authorization/example_perm_complex.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authorization/example_perm_complex.php
    :language: json

.. only:: python

  .. literalinclude:: code/python/authorization/example_perm_complex.py
    :language: json

.. only:: ruby

  .. literalinclude:: code/ruby/authorization/example_perm_complex.rb
    :language: json

How is this flexibility possible? Custom Data.

As mentioned earlier, Stormpath resources like Accounts and Groups are created along with a linked :ref:`customData <ref-customdata>` resource. This resource is very useful for implementing both Account permissions and role (AKA Group) permissions. Essentially, any user-level permissions are defined in a ``customData`` resource linked to a user Account, while any role-level permissions are defined in a ``customData`` resource linked to a role Group. This allows for Stormpath to model user-unique permissions as well as permissions inherited by virtue of a user having one (or more) roles.

Permissions in Stormpath can be modeled as an array inside the ``customData`` resource. They can be as simple as a key-value pair, or more complex objects. A user Account could have their user-unique permissions defined in a ``customData`` resource linked to from their Account. At the same time, their Account would be linked to the application-wide "Admin" Group which would have its own linked ``customData`` resource that would contain definitions of the permissions of all the users with the Admin role in your application.

For more information about adding customData to a user, please see the :ref:`Account Management section <add-user-customdata>`.

.. only:: rest

  To find out all the different things you can do with customData please see the :ref:`Reference chapter <ref-customdata>`.

.. only:: csharp or vbnet

  .. note::

    See the `ICustomData documentation <http://docs.stormpath.com/dotnet/api/html/T_Stormpath_SDK_CustomData_ICustomData.htm>`_ in the .NET API reference for more information on interacting with Custom Data in .NET.

.. only:: nodejs or php or python or java

  To find out all the different things you can do with customData please see the :ref:`Account Custom Data Section <add-user-customdata>`.

Checking User and Role Permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. only:: rest

  Since authorization enforcement is handled by `one of Stormpath's integrations <https://docs.stormpath.com/home/>`_, the primary usefulness of the REST API is in retrieving a user's permissions.

.. only:: csharp or vbnet

  Since authorization enforcement is typically handled by `one of Stormpath's integrations <https://docs.stormpath.com/home/>`_, the primary usefulness of the .NET SDK is in retrieving a user's permissions and building custom authorization logic.

.. only:: java

  Since authorization enforcement is typically handled by `one of Stormpath's integrations <https://docs.stormpath.com/home/>`_, the primary usefulness of the Java SDK is in retrieving a user's permissions and building custom authorization logic.

.. only:: nodejs

  Since authorization enforcement is typically handled by `one of Stormpath's Node integrations <https://docs.stormpath.com/home/>`_, the primary usefulness of the Node.js SDK is in retrieving a user's permissions and building custom authorization logic.

.. only:: php

  Since authorization enforcement is handled by `one of Stormpath's PHP integrations <https://docs.stormpath.com/php/>`_, the primary usefulness of the PHP SDK is in retrieving a user's permissions.

.. only:: python

  Since authorization enforcement is handled by `one of Stormpath's Python integrations <https://docs.stormpath.com/python/>`_, the primary usefulness of the Python SDK is in retrieving a user's permissions.

.. only:: ruby

  Since authorization enforcement is handled by `one of Stormpath's Ruby integrations <https://docs.stormpath.com/ruby/>`_, the primary usefulness of the Ruby SDK is in retrieving a user's permissions.

These permissions can either be found in the custom_data tied a the user (i.e. the Account resource) or to their role (i.e. a Group resource associated to the Account).

Checking User Permissions
"""""""""""""""""""""""""

To check a user's unique permissions, you must retrieve their Account's Custom Data. You can do this in one of two ways:

1. You can retrieve the Account along with the expanded Custom Data, by sending a request:

.. only:: rest

  .. code-block:: http

    GET /v1/accounts/3apenYvL0Z9v9spExAMpLe?expand=customData HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authorization/account_with_customdata_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authorization/account_with_customdata_req.vb
        :language: vbnet

  If :ref:`caching is enabled <set_up_caching>`, the expanded request will "prime" the cache with the Account's Custom Data, so that the request to ``GetCustomDataAsync`` will bypass the network and hit the cache immediately.

.. only:: java

  .. literalinclude:: code/java/authorization/account_with_customdata_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authorization/account_with_customdata_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authorization/account_with_customdata_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authorization/account_with_customdata_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authorization/account_with_customdata_req.rb
    :language: ruby

  or you could instantiate the expansion object in the constructor:

  .. literalinclude:: code/ruby/authorization/account_with_customdata_req2.rb
    :language: ruby

.. only:: rest

  This will return the Account resource along with the customData:

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe",
      "username" : "jlpicard",
      "email" : "capt@enterprise.com",
      "givenName" : "Jean-Luc",
      "surname" : "Picard",
      "customData": {
        "permissions": {
          "crew_quarters": "&nbsp;9-3601",
          "lock_override": "all",
          "command_bridge": {
            "type": "vessel:bridge",
            "identifier": "NCC-1701-D",
            "action": "lockout",
            "control_key": "173467321476C32789777643T732V73117888732476789764376"
          }
        }
      }
    }

.. only:: java

  This will return the Account resource along with the customData.

.. only:: php

  This will return the Account resource along with the customData:

  .. literalinclude:: code/php/authorization/account_with_customdata_resp.php
    :language: php

.. only:: python and ruby

  This will return the Account resource along with the customData.

.. only:: not nodejs

  2. Or you can retrieve only the Custom Data:

.. only:: nodejs

  2. Or you can fetch the Custom Data resource of an existing Account object:

.. only:: rest

  .. code-block:: http

    GET /v1/accounts/3apenYvL0Z9v9spExAMpLe/customData HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authorization/account_customdata_only_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authorization/account_customdata_only_req.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authorization/account_customdata_only_req.java
      :language: java

.. only:: nodejs

  .. literalinclude:: code/nodejs/authorization/account_customdata_only_req.js
      :language: javascript

.. only:: php

  .. literalinclude:: code/php/authorization/account_customdata_only_req.php
    :language: php

.. only:: python

  .. literalinclude:: code/python/authorization/account_customdata_only_req.py
    :language: python

.. only:: ruby

  .. literalinclude:: code/ruby/authorization/account_customdata_only_req.rb
    :language: ruby

.. only:: rest

  Which would return only this:

  .. code-block:: http

    HTTP/1.1 200 OK
    Location: https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe/customData
    Content-Type: application/json;charset=UTF-8

    {
      "href": "https://api.stormpath.com/v1/accounts/3apenYvL0Z9v9spExAMpLe/customData"
      "permissions": {
        "crew_quarters": "&nbsp;9-3601",
        "lock_override": "all",
        "command_bridge": {
          "type": "vessel:bridge",
          "identifier": "NCC-1701-D",
          "action": "lockout",
          "control_key": "173467321476C32789777643T732V73117888732476789764376"
        }
      }
    }

.. only:: java

  Which would return only the CustomData object.

.. only:: nodejs

  In either case, you can now see the Account's Custom Data object:

  .. literalinclude:: code/nodejs/authorization/account_customdata_only_resp.js
      :language: javascript

.. only:: php

  Which would return only this:

  .. literalinclude:: code/php/authorization/account_customdata_only_resp.php
    :language: php

.. only:: python and ruby

  Which would return only the CustomData object.

Checking Role Permissions
"""""""""""""""""""""""""

This would work in much the same way as checking the permissions for a user's Account. You would first need to retrieve the Account's associated Groups:

.. only:: rest

  .. code-block:: http

    GET /v1/accounts/3apenYvL0Z9v9spExAMpLe/groups HTTP/1.1
    Host: api.stormpath.com
    Authorization: Basic MlpG...
    Content-Type: application/json

  From here, you can retrieve the Group's customData in the same way as you did with users. That is by sending a GET with either a ``?expand=customData`` or to the ``/customData`` endpoint.

.. only:: csharp or vbnet

  .. only:: csharp

    .. literalinclude:: code/csharp/authorization/account_groups_req.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authorization/account_groups_req.vb
        :language: vbnet

  Then, you can retrieve the Custom Data from each Group:

  .. only:: csharp

    .. literalinclude:: code/csharp/authorization/get_first_group_customData.cs
        :language: csharp

  .. only:: vbnet

    .. literalinclude:: code/vbnet/authorization/get_first_group_customData.vb
        :language: vbnet

.. only:: java

  .. literalinclude:: code/java/authorization/account_groups_req.java
      :language: java

  From here you can retrieve each Group’s CustomData in the same way as you did with users.

.. only:: nodejs

  .. literalinclude:: code/nodejs/authorization/account_groups_req.js
      :language: javascript

  From here you can retrieve the Group’s CustomData in the same way as you did with users.

.. only:: php

  .. literalinclude:: code/php/authorization/account_groups_req.php
    :language: php

  From here you can retrieve the Group’s customData in the same way as you did with users.

.. only:: python

  .. literalinclude:: code/python/authorization/account_groups_req.py
    :language: python

  From here you can retrieve the Group’s CustomData in the same way as you did with users.

.. only:: ruby

  From here, you can retrieve the Group's customData in the same way as you did with accounts.

  .. literalinclude:: code/ruby/authorization/account_groups_req.rb
    :language: ruby
