.. _set-up:

********************
2. First-Time Set-Up
********************

Now that you've decided that Stormpath is right for you, let's jump right in and get you set-up.

2.1 Sign-up for Stormpath
=========================

1. Go to https://api.stormpath.com/register and complete the form.
2. You will receive a confirmation email with an activation link.
3. Once you click the link, Stormpath will create a Stormpath account along with a Tenant. Your Tenant name will be a unique pair of two randomly-generated words separated by a hyphen (e.g. "iron-troop").

.. note::

  Note your tenant name! You will need this in the future in order to log-in to your Stormpath Admin Console.

4. On this screen, re-enter your password and click "Log In" to enter the Admin Console. From here you will be able to perform all of the administrative functions required for your Stormpath Account. You should start by creating an API key.


2.2 Create an API Key Pair
===========================

In order to use the Stormpath API, you will need an API key. To get one, follow these steps:

1. On the right side of the Admin Console, under "Developer Tools", click the "Create API Key" button.

2. A dialog box will come up, with additional information about the key. You will now be able to download your key in the form of a ``apiKey.properties`` file. This file contains your Stormpath API Key information, which can be used to authenticate with the Stormpath API.

.. note::

  Your API Key should be stored in a secure location. For example, you could place it in a hidden ``stormpath`` directory:

    .. code-block:: bash

      $ mkdir ~/.stormpath
      $ mv ~/Downloads/apiKey.properties ~/.stormpath/

  We also recommend that you change the file's permissions to prevent access by other users. You can do this by running:

    .. code-block:: bash

      $ chmod go-rwx ~/.stormpath/apiKey.properties

.. only:: csharp or vbnet or python or java or nodejs

  2.3 Installing the SDK
  ======================

    .. only:: csharp or vbnet

        To set up your environment follow these steps:

        First, create a new Console Application project in Visual Studio. Install the Stormpath .NET SDK by running

            ``install-package Stormpath.SDK``

        in the Package Manager Console. If you prefer, you can also use the NuGet Package Manager to install the Stormpath.SDK package.

        Next, add these statements at the top of your code:

            .. only:: csharp

                .. literalinclude:: code/csharp/quickstart/using.cs
                    :language: csharp

            .. only:: vbnet

                .. literalinclude:: code/vbnet/quickstart/using.vb
                    :language: vbnet

        Asynchronous and Synchronous Support
        ------------------------------------

        The Stormpath .NET SDK supports the `Task-based asynchronous <https://msdn.microsoft.com/en-us/library/hh873175(v=vs.110).aspx>`_ model by default. Every method that makes a network call ends in ``Async``, takes an optional ``CancellationToken`` parameter, and can be awaited.

        The built-in Visual Studio Console Application template doesn't support making asynchronous calls, but that's easy to fix:

            .. only:: csharp

                .. literalinclude:: code/csharp/quickstart/async_fix.cs
                    :language: csharp

            .. only:: vbnet

                .. literalinclude:: code/vbnet/quickstart/async_fix.vb
                    :language: vbnet

        The ``Stormpath.SDK.Sync`` namespace can be used in older applications or situations where synchronous access is required. This namespace provides a synchronous counterpart to each asynchronous method.

        .. note::

            The asynchronous API is preferred for newer applications. However, the methods available in ``Stormpath.SDK.Sync`` are **natively** synchronous - not just a blocking wrapper over the asynchronous API. These methods can be used safely, even from asynchronous applications.

    .. only:: python

        To set up your environment follow these steps:

        First, install the Stormpath Python SDK by running the following command on
        the terminal:

        .. code:: console

            pip install stormpath

        If you'd like to update to use the latest Stormpath Python SDK, you can
        instead run:

        .. code:: console

            pip install --upgrade stormpath

    .. only:: java

        To setup up your environment for this quickstart, follow these steps:

        Include the following  dependencies in your Maven ``pom.xml`` file:

        .. code-block:: xml

            ...

            <dependencies>

                ...

                <dependency>
                    <groupId>com.stormpath.sdk</groupId>
                    <artifactId>stormpath-sdk-api</artifactId>
                    <version>###latest_stormpath_version###</version>
                </dependency>
                <dependency>
                    <groupId>com.stormpath.sdk</groupId>
                    <artifactId>stormpath-sdk-httpclient</artifactId>
                    <version>###latest_stormpath_version###</version>
                    <scope>runtime</scope>
                </dependency>

                ...

            </dependencies>

            ...

    .. only:: nodejs

        To set up your environment follow these steps:

        First, install the Stormpath Node.js SDK by running the following command on
        the terminal:

        .. code:: console

            npm install stormpath

With these steps complete, you are now ready for the :ref:`Quickstart <quickstart>`.