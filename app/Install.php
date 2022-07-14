<?php

namespace App;

use MadWeb\Initializer\Contracts\Runner;

class Install
{
    public function production(Runner $run)
    {
        $run->external('composer', 'install', '--no-dev', '--prefer-dist', '--optimize-autoloader')
            ->artisan('key:generate', ['--force' => true])
            ->artisan('migrate', ['--force' => true])
            ->artisan('storage:link')
            ->external('npm', 'install', '--production')
            ->external('npm', 'run', 'production')
            ->artisan('route:cache')
            ->artisan('config:cache')
            ->artisan('event:cache');
    }

    public function local(Runner $run)
    {
        $run->external('composer', 'install')
            ->external('npm', 'install')
            ->external('npm', 'run', 'development')
            ->artisan('key:generate')
            ->artisan('migrate')
            ->artisan('db:seed');
    }
}
